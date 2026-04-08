import { HomePage } from '@/components/HomePage';
import pool, { ScheduleItemRow, UserRow } from '@/lib/db';
import { ScheduleItem, ScheduleItemTmr } from '@/types/schedule_item';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface ScheduleItemTmrRow extends ScheduleItemRow {
	is_tomorrow: boolean;
}

// Функция получения отзывов
async function getFeaturedReviews() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM reviews WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 6'
    );
    return rows as any[];
  } catch (e) {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Join Eilat Dance Center for world-class dance instruction. Hip-hop, Jazz-funk, Argentine Tango, Ballet, and more. Classes for all levels.',
};

// 2. Блог: 3 последних поста из разных категорий
async function getLatestPosts() {
  try {
    /* 
       Сложный запрос:
       1. Делаем ROW_NUMBER() для группировки по категориям, сортируя по дате.
       2. Берем только первые записи в каждой категории (rn = 1).
       3. Сортируем полученный набор по дате и берем 3.
       
       Примечание: MySQL 5.7 не поддерживает CTE и Window Functions так хорошо, как 8.0.
       Если у тебя старый MySQL, запрос будет сложнее. 
       Предположим современный MySQL/MariaDB.
    */
    
    // Упрощенный вариант (без Window Functions, работает везде):
    // Получаем последние посты, сортируем по дате, на JS фильтруем уникальные категории.
    // Это проще и надежнее для небольшого блога.
    
    const [rows] = await pool.execute(`
      SELECT p.title, p.excerpt, p.slug, p.published_at, p.category_id, p.image_url, 
             c.name as category_name, c.color as category_color, c.gradient as category_gradient
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_published = 1
      ORDER BY p.published_at DESC
      LIMIT 50
    `);
    
    const allPosts = rows as any[];
    const uniqueCategories = new Set();
    const result = [];

    for (const post of allPosts) {
      if (result.length >= 3) break;
      // Если категория еще не встречалась (или категория null, но мы берем только один безкатегорийный)
      // Можно разрешить дубликаты категорий, если контента мало, но по ТЗ просили "разных".
      if (!uniqueCategories.has(post.category_id)) {
        uniqueCategories.add(post.category_id);
        result.push(post);
      }
    }
    
    // Если постов с уникальными категориями < 3, можно добрать остальные
    if (result.length < 3) {
        const usedSlugs = new Set(result.map(p => p.slug));
        for (const post of allPosts) {
            if (result.length >= 3) break;
            if (!usedSlugs.has(post.slug)) {
                result.push(post);
            }
        }
    }

    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// 3. Расписание: Сегодня/Завтра
async function getUpcomingClasses() {
  try {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const currentTime = now.toTimeString().slice(0, 5); // 'HH:MM'

    // Запрос: Только на сегодня, время > текущего
    const query = `
      SELECT 
	  	s.id, 
		s.day_date, 
		s.start_time, 
		s.class_name, 
		s.level, 
		s.category, 
		s.comment, 
		s.price, 
		s.instructors,
		(dayofweek(s.day_date) - 1) day_of_week
      FROM schedule_items s
      WHERE s.day_date = ? AND s.start_time >= ?
      ORDER BY s.start_time ASC
      LIMIT 5
    `;

	// 1. Получаем items
    const [items] = await pool.execute<ScheduleItemRow[]>(query, [currentDate, currentTime]);

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

    return enrichedItems as ScheduleItem[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const reviews = await getFeaturedReviews();
  const posts = await getLatestPosts();
  const classes = await getUpcomingClasses();


  return (
    <>
      <HomePage reviews={reviews} posts={posts} classes={classes} />
    </>
  );
}
