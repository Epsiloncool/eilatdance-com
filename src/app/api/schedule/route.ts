import { NextResponse } from 'next/server';
import pool, { UserRow } from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';
import { ScheduleItemRow } from '@/lib/db';

// GET: Получение расписания за диапазон
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from'); // YYYY-MM-DD
    const to = searchParams.get('to');     // YYYY-MM-DD

    if (!from || !to) return NextResponse.json([]);

    const query = `
      SELECT s.*, dayofweek(s.day_date) - 1 day_of_week
      FROM schedule_items s
      WHERE s.day_date >= ? AND s.day_date <= ?
      ORDER BY s.day_date ASC, s.start_time ASC
    `;

	// 1. Получаем items
    const [items] = await pool.execute<ScheduleItemRow[]>(query, [from, to]);
console.log(items);
	// 2. Собираем ID инструкторов
	const instructorIds = new Set<number>();
	items.forEach((item: any) => {
  		// mysql2 возвращает JSON столбец как объект (если configured) или строку
  		let ids = item.instructors;
  		if (typeof ids === 'string') ids = JSON.parse(ids);
  		if (Array.isArray(ids)) ids.forEach((id: number) => instructorIds.add(id));
	});

	// 3. Получаем имена
	let instructorsMap: Record<number, any> = {};
	if (instructorIds.size > 0) {
  		const [users] = await pool.execute<UserRow[]>(
    		`SELECT id, name, display_name FROM users WHERE id IN (${Array.from(instructorIds).join(',')})`
  		);
  		users.forEach((u: any) => instructorsMap[u.id] = u);
	}

	// 4. Обогащаем items
	const enrichedItems = items.map((item: any) => {
  		let ids = typeof item.instructors === 'string' ? JSON.parse(item.instructors) : item.instructors;
  		const itemInstructors = (ids || []).map((id: number) => instructorsMap[id]).filter(Boolean);
  
  		return {
    		...item,
    		instructors_data: itemInstructors // Массив объектов [{display_name: {...}, name: "..."}]
  		};
	});

	return NextResponse.json(enrichedItems);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// POST: Добавление (на конкретную дату)
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { 
      day_date, // "2025-12-22"
      start_time, 
      class_name, 
      level, 
      category,
      comment,
	  price, 
	  instructors
    } = body;

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO schedule_items 
      (day_date, start_time, class_name, level, category, comment, price, instructors) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        day_date, 
        start_time, 
        JSON.stringify(class_name), 
        level, 
        category || 'all',
        JSON.stringify(comment),
		price || null,
		JSON.stringify(instructors || [])
      ]
    );

    return NextResponse.json({ message: 'Item created', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
