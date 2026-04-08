import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM dance_styles WHERE id = ?', [id]);
  if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    const body = await request.json();
    // Добавляем category
    const { name, description, level, image_url, gradient, category, price } = body;

    await pool.execute(
      `UPDATE dance_styles SET name=?, description=?, level=?, image_url=?, gradient=?, category=?, price=? WHERE id=?`,
      [
        JSON.stringify(name), 
        JSON.stringify(description), 
        level, 
        image_url, 
        gradient, 
        category, 
		price,
        id
      ]
    );

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    const { id } = await context.params;
    await pool.execute('DELETE FROM dance_styles WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
