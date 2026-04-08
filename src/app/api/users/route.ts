import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcrypt';

// GET All Users
export async function GET(request: Request) {
  try {
    const session = await getSession();
    // Разрешаем просмотр списка только админам, или публично только имена/фото (для селектов)
    // Но так как это админский роут полного списка, проверим права строго
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	const { searchParams } = new URL(request.url);
	const onlyInstructors = searchParams.get('instructors') === 'true';

	let query = 'SELECT id, name, email, role, phone, image_url, bio, display_name, is_instructor FROM users';
	if (onlyInstructors) {
		query += ' WHERE is_instructor = 1';
	}
	query += ' ORDER BY id ASC';

    const [rows] = await pool.execute(query);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// POST Create User
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, email, password, role, phone, bio, image_url, is_instructor, display_name } = body;

    if (!password) return NextResponse.json({ message: 'Password required' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = crypto.randomUUID(); // import crypto from 'crypto' (node native)

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (uuid, name, email, password_hash, role, phone, bio, image_url, is_instructor, display_name) 
       VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role || 'user', phone, JSON.stringify(bio), image_url, is_instructor ? 1 : 0, JSON.stringify(display_name) ]
    );

    return NextResponse.json({ message: 'Created', id: result.insertId });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') return NextResponse.json({ message: 'Email exists' }, { status: 409 });
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
