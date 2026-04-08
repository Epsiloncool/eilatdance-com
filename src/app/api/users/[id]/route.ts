import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT id, name, email, role, phone, bio, image_url FROM users WHERE id = ?', [id]);
  if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    const body = await request.json();
    const { name, email, password, role, phone, bio, image_url, is_instructor, display_name } = body;

    let query = 'UPDATE users SET name=?, email=?, role=?, phone=?, bio=?, image_url=?, is_instructor=?, display_name=?';
    let params = [name, email, role, phone, JSON.stringify(bio), image_url, is_instructor ? 1 : 0, JSON.stringify(display_name) ];

    // Если передан пароль, обновляем его
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password_hash=?';
      params.push(hashedPassword);
    }

    query += ' WHERE id=?';
    params.push(id);

    await pool.execute(query, params);

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
    
    // Не даем удалить самого себя
    if (session.userId === parseInt(id)) return NextResponse.json({ message: 'Cannot delete yourself' }, { status: 400 });

    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
