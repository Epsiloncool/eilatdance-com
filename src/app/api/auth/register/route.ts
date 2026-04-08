import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone, secretKey } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Определение роли
    const role = secretKey === process.env.ADMIN_SECRET_KEY ? 'admin' : 'user';

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = crypto.randomUUID();

    // Запись в БД
    const [result] = await pool.execute(
      'INSERT INTO users (uuid, email, password_hash, role, name, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [uuid, email, hashedPassword, role, name || null, phone || null]
    );

    return NextResponse.json({ message: 'User created successfully', userId: (result as any).insertId });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}