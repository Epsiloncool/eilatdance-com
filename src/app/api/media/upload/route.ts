import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

const execPromise = util.promisify(exec);

// Конфигурация размеров
const PREVIEW_SIZES = [
  { w: 1280, h: 1024 },
  { w: 1024, h: 820 },
  { w: 720, h: 576 },
  { w: 360, h: 288 },
];

export async function POST(request: Request) {
  try {
    // 1. Проверка прав
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Получение файла
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 3. Формирование путей и имен
    const date = new Date();
    const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, ''); // 20251209
    const hhmmss = date.toTimeString().slice(0, 8).replace(/:/g, ''); // 143005
    
    // Очистка имени файла от спецсимволов и пробелов
    const cleanName = file.name.substring(0, file.name.lastIndexOf('.')).replace(/[^a-zA-Z0-9-_]/g, '');
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    const baseDirRelative = `/uploads/${yyyymmdd}/`;
    const uploadDir = path.join(process.cwd(), 'public', baseDirRelative);
    
    // Создаем папку, если нет
    await mkdir(uploadDir, { recursive: true });

    const origFilename = `${hhmmss}-${cleanName}.${ext}`;
    const origPath = path.join(uploadDir, origFilename);

    // 4. Сохранение оригинала
    await writeFile(origPath, buffer);

    // 5. Получение размеров оригинала через ImageMagick
    let origWidth = 0;
    let origHeight = 0;
    try {
      const { stdout } = await execPromise(`magick identify -format "%w %h" "${origPath}"`);
      const [w, h] = stdout.trim().split(' ');
      origWidth = parseInt(w);
      origHeight = parseInt(h);
    } catch (e) {
      console.error('ImageMagick identify failed:', e);
      // Fallback или ошибка, но продолжим
    }

    // 6. Генерация превью
    const previewsData = [];

    for (const size of PREVIEW_SIZES) {
      const previewFilename = `${hhmmss}-${cleanName}-${size.w}x${size.h}.webp`;
      const previewPath = path.join(uploadDir, previewFilename);
      
      // Команда ресайза: масштабируем, сохраняя пропорции, чтобы вписаться в box, конвертируем в webp
      // Используем '>' чтобы не увеличивать маленькие картинки
      const cmd = `magick "${origPath}" -resize "${size.w}x${size.h}>" -quality 85 "${previewPath}"`;
      
      try {
        await execPromise(cmd);
        
        // Получаем реальные размеры созданного превью (могут отличаться из-за пропорций)
        const { stdout } = await execPromise(`magick identify -format "%w %h" "${previewPath}"`);
        const [resW, resH] = stdout.trim().split(' ');

        previewsData.push({
          ident: `preview_${size.w}_${size.h}`,
          width: parseInt(resW),
          height: parseInt(resH),
          filename: previewFilename
        });
      } catch (e) {
        console.error(`Failed to resize ${size.w}x${size.h}:`, e);
      }
    }

    // 7. Запись в БД
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO medias 
      (title, description, alt, mimetype, orig_filename, orig_filesize, base_dir, orig_width, orig_height, previews, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        cleanName, // title по умолчанию имя файла
        '', // description
        cleanName, // alt
        file.type,
        origFilename,
        file.size,
        baseDirRelative,
        origWidth,
        origHeight,
        JSON.stringify(previewsData)
      ]
    );

    return NextResponse.json({ 
      message: 'Uploaded', 
      id: result.insertId,
      url: `${baseDirRelative}${origFilename}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}