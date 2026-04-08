import { PostEditor } from '../PostEditor';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  // Получаем данные напрямую из БД, так как это серверный компонент внутри той же сети
  const { id } = await params;
  
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM posts WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    notFound();
  }

  return <PostEditor initialData={rows[0]} />;
}
