import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

// Получить одну
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM categories WHERE id = ?', [id]);
  if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

// Обновить
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, description, color, gradient } = body;

    await pool.execute(
      'UPDATE categories SET name = ?, description = ?, color = ?, gradient = ? WHERE id = ?',
      [JSON.stringify(name), JSON.stringify(description), color, gradient, id]
    );

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// Удалить (с проверкой использования)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    // Проверка: есть ли посты с этой категорией
    const [countResult] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM posts WHERE category_id = ?', 
      [id]
    );
    
    if (countResult[0].count > 0) {
      return NextResponse.json({ 
        message: `Cannot delete: ${countResult[0].count} posts are using this category.` 
      }, { status: 409 });
    }

    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}