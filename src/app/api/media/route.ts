import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM medias ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching media' }, { status: 500 });
  }
}