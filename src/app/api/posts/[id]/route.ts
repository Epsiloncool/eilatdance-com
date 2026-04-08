import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

// Получить один пост
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM posts WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

// Обновить пост (PUT)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // ... проверка сессии ...
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    
    const { 
      title, slug, content, excerpt, category_id, image_url, author_id, published_at, quote,
      is_published, is_featured, related_ids
    } = body;

    await pool.execute(
      `UPDATE posts SET 
        title = ?, slug = ?, content = ?, excerpt = ?, category_id = ?, image_url = ?,
        author_id = ?, published_at = ?, quote = ?, is_published = ?, is_featured = ?, related_ids = ?
       WHERE id = ?`,
      [
        JSON.stringify(title), 
        slug, 
        JSON.stringify(content), 
        JSON.stringify(excerpt), 
        category_id || null, 
        image_url,
        author_id || null, 
        published_at ? new Date(published_at) : null,
        JSON.stringify(quote),
        is_published ? 1 : 0,
        is_featured ? 1 : 0,
		JSON.stringify(related_ids || []),
        id
      ]
    );

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating post' }, { status: 500 });
  }
}

// Удалить пост
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await pool.execute('DELETE FROM posts WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
  }
}
