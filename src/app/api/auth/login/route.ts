import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Поиск пользователя
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Создание сессии
    await createSession({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    });

    return NextResponse.json({ message: 'Logged in successfully', role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}