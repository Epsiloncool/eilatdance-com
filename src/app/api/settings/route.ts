import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';

// Получить все настройки (публичный доступ, так как нужны на фронте)
export async function GET() {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM settings');
    // Преобразуем массив [{setting_key: 'phone', setting_value: '...'}] в объект {phone: '...'}
    const settings = rows.reduce((acc: any, row: any) => {
      // Пытаемся распарсить JSON, если value похоже на него, иначе строка
      let val = row.setting_value;
      try { val = JSON.parse(val); } catch (e) {} // mysql2 может вернуть уже объект для JSON полей
      
      // Если это JSON поле в БД, оно уже может быть объектом.
      // Но если мы храним простые строки в JSON столбце, они будут в кавычках.
      // Для универсальности:
      acc[row.setting_key] = val;
      return acc;
    }, {});
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// Сохранить настройки (Только админ)
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json(); // Ожидаем объект { key: value, key2: value2 }

    // Используем транзакцию или просто цикл. Для простоты цикл upsert'ов.
    for (const [key, value] of Object.entries(body)) {
      await pool.execute(
        `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, JSON.stringify(value), JSON.stringify(value)]
      );
    }

 	revalidatePath('/', 'layout');

    return NextResponse.json({ message: 'Settings saved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving' }, { status: 500 });
  }
}