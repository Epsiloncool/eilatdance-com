import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';
import { revalidatePath, revalidateTag } from 'next/cache';

// GET: Получение списка для админки (с пагинацией, поиском и сортировкой)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sort') || 'phrase'; // 'phrase' | 'file' | 'status'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    const params: any[] = [];
    let whereClause = '';

    if (search) {
      whereClause = `
        AND (
          t.ident LIKE ? 
          OR EXISTS (SELECT 1 FROM translation_texts tt WHERE tt.phrase_id = t.id AND tt.phrase_text LIKE ?)
        )
      `;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Подзапрос для JSON переводов (общий для обоих режимов)
    const translationsSubquery = `
      (SELECT JSON_OBJECTAGG(tt.lang, tt.phrase_text) 
       FROM translation_texts tt 
       WHERE tt.phrase_id = t.id) as translations_json
    `;

    // Подзапрос для статуса (кол-во переводов)
    const statusSubquery = `
      (SELECT COUNT(*) FROM translation_texts tt WHERE tt.phrase_id = t.id) as trans_count,
      (SELECT COUNT(*) FROM translation_texts tt WHERE tt.phrase_id = t.id AND tt.lang = 'en') as has_en
    `;

    let query = '';
    let countQuery = '';

    if (sortBy === 'file') {
      // РЕЖИМ: Группировка по файлам (разворачиваем refs)
      // Одна фраза может дублироваться, если она в разных файлах
      query = `
        SELECT 
          t.id as id, 
          t.ident, 
          r.path, 
          r.group_name,
          r.positions,
          ${translationsSubquery}
        FROM translation_refs r
        JOIN translations t ON r.phrase_id = t.id
        WHERE 1=1 ${whereClause}
        ORDER BY r.path ASC, t.ident ASC
        LIMIT ` + offset + `, ` + limit + `
      `;
      countQuery = `
        SELECT COUNT(*) as total 
        FROM translation_refs r 
        JOIN translations t ON r.phrase_id = t.id 
        WHERE 1=1 ${whereClause}
      `;
    } else {
      // РЕЖИМ: Группировка по фразам (уникальные фразы)
      // Агрегируем пути в JSON список
      query = `
        SELECT 
          t.id, 
          t.ident, 
          t.insert_dt,
          (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT('path', tr.path, 'group', tr.group_name)
            )
            FROM translation_refs tr 
            WHERE tr.phrase_id = t.id
          ) as refs_json,
          ${translationsSubquery},
          ${statusSubquery}
        FROM translations t
        WHERE 1=1 ${whereClause}
        ORDER BY ${sortBy === 'status' ? 'has_en ASC, trans_count ASC,' : ''} t.ident ASC
        LIMIT ` + offset + `, ` + limit + `
      `;
      countQuery = `SELECT COUNT(*) as total FROM translations t WHERE 1=1 ${whereClause}`;
    }

    const [countRes] = await pool.execute<RowDataPacket[]>(countQuery, params);
    const total = countRes[0].total;

    const [rows] = await pool.execute<RowDataPacket[]>(query, [...params]);

    return NextResponse.json({
      data: rows,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// POST: Обновление перевода (или создание нового ключа)
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, ident, group_name, position, comment, translations } = body; 
    // translations = { en: "Hello", ru: "Привет" }

    // Если id передан - обновление метаданных ключа (опционально)
    // Основная задача здесь - обновить тексты

    if (!id) {
       // Создание нового ключа (если вдруг нужно вручную)
       // ... логика INSERT ...
       return NextResponse.json({ message: 'Manual creation not implemented yet' }, { status: 501 });
    }

    // Обновляем тексты (UPSERT для каждого языка)
    for (const [lang, text] of Object.entries(translations)) {
      if (text === '') {
          // Если текст пустой, можно удалять запись? Или хранить пустую? 
          // Лучше хранить пустую строку или NULL, если это удаление перевода.
          // Для простоты - делаем INSERT/UPDATE
      }
      
      await pool.execute(
        `INSERT INTO translation_texts (phrase_id, lang, phrase_text) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE phrase_text = ?`,
        [id, lang, text, text]
      );
    }
    
    // Перевалидация кэша Next.js (чтобы тексты обновились на сайте)
    revalidatePath('/', 'layout'); 
	revalidateTag('translations', 'max');

    return NextResponse.json({ message: 'Saved' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving' }, { status: 500 });
  }
}
