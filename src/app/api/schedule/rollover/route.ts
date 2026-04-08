import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(request: Request) {
  // Простая защита: проверяем заголовок Authorization
  // В Cron задаче нужно добавить: -H "Authorization: Bearer <CRON_SECRET>"
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
	const { searchParams } = new URL(request.url);
	const todayParam = searchParams.get('today');

	// Вместо const today = new Date(); используем:
	const today = todayParam ? new Date(todayParam) : new Date();

	// Проверка валидности даты (опционально)
	if (isNaN(today.getTime())) {
	    return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
	}

    // 1. Вычисляем Понедельник ТЕКУЩЕЙ недели
    const day = today.getDay(); // 0=Sun, 1=Mon
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Корректировка, если сегодня воскресенье
    
    const currentMonday = new Date(today);
    currentMonday.setDate(diff);
    currentMonday.setHours(0, 0, 0, 0);

    // 2. Вычисляем Понедельник СЛЕДУЮЩЕЙ недели (Target)
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(currentMonday.getDate() + 7);

    const currentMonStr = currentMonday.toISOString().slice(0, 10);
    const nextMonStr = nextMonday.toISOString().slice(0, 10);

    // 3. ПРОВЕРКА: Есть ли уже данные на следующей неделе?
    const [targetCheck] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM schedule_items 
       WHERE day_date >= ? AND day_date < DATE_ADD(?, INTERVAL 7 DAY)`,
      [nextMonStr, nextMonStr]
    );

    if (targetCheck[0].count > 0) {
      return NextResponse.json({ 
        message: 'Skipped: Target week already has classes.', 
        targetDate: nextMonStr 
      });
    }

    // 4. ВЫБОРКА: Берем данные с текущей недели
    const [sourceItems] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM schedule_items 
       WHERE day_date >= ? AND day_date < ?`,
      [currentMonStr, nextMonStr]
    );

    if (sourceItems.length === 0) {
      return NextResponse.json({ 
        message: 'Skipped: No classes in current week to copy.',
        sourceDate: currentMonStr
      });
    }

    // 5. КОПИРОВАНИЕ
    let copiedCount = 0;

    for (const item of sourceItems) {
      // Вычисляем новую дату: Старая дата + 7 дней
      const oldDate = new Date(item.day_date);
      const newDate = new Date(oldDate);
      newDate.setDate(oldDate.getDate() + 7);
      
      const newDateStr = newDate.toISOString().slice(0, 10);
console.log('Insert new data:');	  
console.log([
          item.day_of_week,
          newDateStr, // Новая дата
          item.start_time,
          item.duration_minutes,
          // Важно: mysql2 может возвращать JSON как объект или строку. Приводим к строке для INSERT.
          typeof item.class_name === 'object' ? JSON.stringify(item.class_name) : item.class_name,
          typeof item.level === 'object' ? JSON.stringify(item.level) : item.level,
          item.category,
          typeof item.instructors === 'object' ? JSON.stringify(item.instructors) : item.instructors,
          typeof item.comment === 'object' ? JSON.stringify(item.comment) : item.comment,
          item.price
        ]);
      await pool.execute(
        `INSERT INTO schedule_items 
        (day_date, start_time, duration_minutes, class_name, level, category, instructors, comment, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newDateStr, // Новая дата
          item.start_time,
          item.duration_minutes,
          // Важно: mysql2 может возвращать JSON как объект или строку. Приводим к строке для INSERT.
          typeof item.class_name === 'object' ? JSON.stringify(item.class_name) : item.class_name,
          typeof item.level === 'object' ? JSON.stringify(item.level) : item.level,
          item.category,
          typeof item.instructors === 'object' ? JSON.stringify(item.instructors) : item.instructors,
          typeof item.comment === 'object' ? JSON.stringify(item.comment) : item.comment,
          item.price
        ]
      );
      copiedCount++;
    }

    return NextResponse.json({ 
      message: 'Success: Schedule rolled over to next week.',
      copied: copiedCount,
      targetDate: nextMonStr
    });

  } catch (error) {
    console.error('Rollover error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}