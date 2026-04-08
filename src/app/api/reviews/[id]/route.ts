import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Получить один
export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM reviews WHERE id = ?', [id]);
  if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

// Обновить
export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { author_name, content, video_url, is_featured } = body;

    await pool.execute(
      `UPDATE reviews SET author_name=?, content=?, video_url=?, is_featured=? WHERE id=?`,
      [
        JSON.stringify(author_name), 
        JSON.stringify(content), 
        video_url || null, 
        is_featured ? 1 : 0, 
        id
      ]
    );

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// Удалить
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    await pool.execute('DELETE FROM reviews WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}