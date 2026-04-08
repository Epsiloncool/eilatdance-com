import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

// GET All
export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM dance_styles ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// POST Create
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    // Добавляем category
    const { name, description, level, image_url, gradient, category, price } = body;

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO dance_styles (name, description, level, image_url, gradient, category, price) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(name), 
        JSON.stringify(description), 
        level, 
        image_url, 
        gradient, 
        category || 'adults', // Дефолтное значение
		price || null
      ]
    );

    return NextResponse.json({ message: 'Created', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}