import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

// Получить все отзывы (для админки)
export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM reviews ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// Создать отзыв
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    // author_name и content теперь приходят как объекты {en: "", ...}
    const { author_name, content, video_url, is_featured } = body;

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO reviews (author_name, content, video_url, is_featured) 
       VALUES (?, ?, ?, ?)`,
      [
        JSON.stringify(author_name), 
        JSON.stringify(content), 
        video_url || null, 
        is_featured ? 1 : 0
      ]
    );

    return NextResponse.json({ message: 'Created', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
