import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { ResultSetHeader } from 'mysql2';

// Получить все посты
export async function GET() {
  try {
    const [rows] = await pool.execute(
      `SELECT p.id, p.title, p.category_id, p.is_published, p.published_at, p.created_at, p.slug, p.is_featured, ct.name category 
       FROM posts p
	   LEFT JOIN categories ct
		on ct.id = p.category_id
       ORDER BY p.is_featured DESC, p.created_at DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}

// Создать пост
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { 
      title, slug, content, excerpt, category_id, image_url, author_id, published_at, quote, 
      is_published, is_featured, related_ids
    } = body;

    // ... генерация slug ...
    const finalSlug = slug || (title?.en || 'untitled').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO posts 
      (title, slug, content, excerpt, category_id, image_url, author_id, published_at, quote, is_published, is_featured, related_ids)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(title),
        finalSlug,
        JSON.stringify(content), // Теперь это будет JSON структура от BlockNote
        JSON.stringify(excerpt),
        category_id || null,
        image_url,
        author_id || null,
        published_at ? new Date(published_at) : new Date(),
        JSON.stringify(quote),
        is_published ? 1 : 0, // boolean -> tinyint
        is_featured ? 1 : 0,
		JSON.stringify(related_ids || []),
      ]
    );

    return NextResponse.json({ message: 'Post created', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}