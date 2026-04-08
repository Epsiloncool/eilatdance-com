import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

// Получить все категории
export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY id ASC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}

// Создать категорию
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, description, color, gradient } = body;

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO categories (name, description, color, gradient) VALUES (?, ?, ?, ?)',
      [JSON.stringify(name), JSON.stringify(description), color, gradient]
    );

    return NextResponse.json({ message: 'Created', id: result.insertId });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}