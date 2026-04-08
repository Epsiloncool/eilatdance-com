import { CategoryEditor } from '../CategoryEditor';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  // Получаем данные напрямую из БД, так как это серверный компонент внутри той же сети
  const { id } = await params;
  
  const [rows] = await pool.execute<RowDataPacket[]>(
	'SELECT * FROM categories WHERE id = ?',
	[id]
  );

  if (rows.length === 0) {
	notFound();
  }

  return <CategoryEditor initialData={rows[0]} />;
}
