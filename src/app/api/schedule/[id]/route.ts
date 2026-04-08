import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

// Удаление занятия
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params; // В Next.js 15 params нужно ждать, но в 14 нет. Если ошибка, добавь await params

    await pool.execute('DELETE FROM schedule_items WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Обновление занятия
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

	const { id } = await params;
	const body = await request.json();
	const { day_date, start_time, class_name, level, category, instructors, comment, price } = body;

	await pool.execute(
	  `UPDATE schedule_items SET 
   		day_date=?, start_time=?, class_name=?, level=?, category=?, instructors=?, comment=?, price=?
   		WHERE id=?`,
  		[day_date, start_time, JSON.stringify(class_name), level, category, JSON.stringify(instructors), JSON.stringify(comment), price, id]
	);

    return NextResponse.json({ message: 'Item updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
