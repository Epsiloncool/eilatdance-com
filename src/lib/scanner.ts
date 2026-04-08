import fs from 'fs';
import path from 'path';
import pool from './db';
import { RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise';

// Типы для статистики
export type ScanStats = {
  newPhrases: number;
  newRefs: number;
  updatedRefs: number;
  deletedRefs: number;
  filesScanned: number;
};

// Рекурсивный поиск файлов
function getFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        getFiles(path.join(dir, file), fileList);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

export async function scanTranslations(dbPool: Pool = pool): Promise<ScanStats> {
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, 'src');
  
  const files = getFiles(srcDir);
  const stats: ScanStats = { newPhrases: 0, newRefs: 0, updatedRefs: 0, deletedRefs: 0, filesScanned: 0 };

  // 1. Загружаем существующие переводы для маппинга ident -> id
  const [rows] = await dbPool.execute<RowDataPacket[]>('SELECT id, ident FROM translations');
  const phraseMap = new Map<string, number>();
  rows.forEach(r => phraseMap.set(r.ident, r.id));

  // Список найденных рефов для последующей очистки устаревших: Map<"phraseId:path", true>
  const foundRefsCheck = new Set<string>();

  for (const filePath of files) {
    stats.filesScanned++;
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/'); // Нормализация путей для Windows

    // 1. Поиск групп перевода
    // Ищем /* Translation Group: ... */
    const groupRegex = /\/\*\s*Translation Group:\s*(.*?)\s*\*\//g;
    const groups: { start: number, name: string }[] = [];
    let groupMatch;
    while ((groupMatch = groupRegex.exec(content)) !== null) {
      groups.push({ start: groupMatch.index, name: groupMatch[1].trim() });
    }

    // 2. Поиск вызовов t('...')
    // Поддерживаем ' и "
    const tRegex = /\bt\s*\(\s*(['"])([^'"]+)\1\s*\)/g;
    
    let match;
    // Используем map чтобы хранить позиции для каждого идента в этом файле
    // Map<ident, { positions: number[], group: string, defaultText?: string }>
    const fileMatches = new Map<string, { positions: number[], group: string | null, defaultText: string | null }>();

    while ((match = tRegex.exec(content)) !== null) {
      const ident = match[2];
      const index = match.index;
      
      // Определяем группу (берем последнюю объявленную перед этим вхождением)
      let currentGroup = null;
      for (const g of groups) {
        if (g.start < index) currentGroup = g.name;
        else break;
      }

      // Проверяем комментарий с дефолтным текстом сразу после вызова
      // Ищем /* ... */ после закрывающей скобки
      const afterMatch = content.substring(index + match[0].length);
      const commentMatch = afterMatch.match(/^\s*\/\*(.*?)\*\//);
      const defaultText = commentMatch ? commentMatch[1].trim() : null;

      if (!fileMatches.has(ident)) {
        fileMatches.set(ident, { positions: [], group: currentGroup, defaultText });
      }
      fileMatches.get(ident)?.positions.push(index);
      
      // Если группа поменялась по ходу файла для одного и того же идента, 
      // это сложный кейс. Для простоты считаем, что группа привязывается к первому вхождению или последнему.
      // В текущей логике мы будем обновлять группу на актуальную для последнего вхождения или хранить массив.
      // ТЗ: "Присваивается имя группы". Пусть будет группа последнего вхождения, если они разные, 
      // или лучше: разбивать на разные refs если группы разные? 
      // Твоя схема БД имеет unique(phrase_id, path). Значит, в ОДНОМ файле у фразы может быть только ОДНА группа.
      // Обновляем группу на актуальную
      if (currentGroup) {
         const entry = fileMatches.get(ident);
         if (entry) entry.group = currentGroup;
      }
    }

    // 3. Сохранение в БД
    for (const [ident, data] of fileMatches) {
      let phraseId = phraseMap.get(ident);

      // Если фразы нет - создаем
      if (!phraseId) {
        const [res] = await dbPool.execute<ResultSetHeader>(
          'INSERT INTO translations (ident, insert_dt) VALUES (?, NOW())',
          [ident]
        );
        phraseId = res.insertId;
        phraseMap.set(ident, phraseId);
        stats.newPhrases++;

        // Если есть дефолтный текст - добавляем английский перевод
        if (data.defaultText) {
          await dbPool.execute(
            'INSERT INTO translation_texts (phrase_id, lang, phrase_text) VALUES (?, "en", ?)',
            [phraseId, data.defaultText]
          );
        }
      }

      // Upsert в refs
      // Проверяем, есть ли такой ref
      const [existingRef] = await dbPool.execute<RowDataPacket[]>(
        'SELECT id FROM translation_refs WHERE phrase_id = ? AND path = ?',
        [phraseId, relativePath]
      );

      const positionsJson = JSON.stringify(data.positions);

      if (existingRef.length > 0) {
        // Обновляем
        await dbPool.execute(
          'UPDATE translation_refs SET positions = ?, group_name = ? WHERE id = ?',
          [positionsJson, data.group, existingRef[0].id]
        );
        stats.updatedRefs++;
      } else {
        // Создаем
        await dbPool.execute(
          'INSERT INTO translation_refs (phrase_id, path, positions, group_name) VALUES (?, ?, ?, ?)',
          [phraseId, relativePath, positionsJson, data.group]
        );
        stats.newRefs++;
      }

      // Запоминаем, что этот ref актуален
      foundRefsCheck.add(`${phraseId}:${relativePath}`);
    }
  }

  // 4. Очистка устаревших refs
  // Удаляем те записи из translation_refs, которых мы не встретили при сканировании
  // Это может быть медленно на огромных базах, но для сайта студии ок.
  
  // Получаем все существующие refs из БД
  const [allRefs] = await dbPool.execute<RowDataPacket[]>('SELECT id, phrase_id, path FROM translation_refs');
  
  for (const ref of allRefs) {
    const key = `${ref.phrase_id}:${ref.path}`;
    if (!foundRefsCheck.has(key)) {
      await dbPool.execute('DELETE FROM translation_refs WHERE id = ?', [ref.id]);
      stats.deletedRefs++;
    }
  }

  return stats;
}