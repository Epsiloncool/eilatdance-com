import { StyleEditor } from '../StyleEditor';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { notFound } from 'next/navigation';

export default async function EditStylesPage({ params }: { params: { id: string } }) {
  // Получаем данные напрямую из БД, так как это серверный компонент внутри той же сети
  const { id } = await params;
  
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM dance_styles WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    notFound();
  }

  return <StyleEditor initialData={rows[0]} />;
}
