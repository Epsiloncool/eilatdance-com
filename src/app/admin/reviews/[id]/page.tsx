import { ReviewEditor } from '../ReviewEditor';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ id: string }> };

export default async function EditReviewPage({ params }: PageProps) {
  const { id } = await params;
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM reviews WHERE id = ?', [id]);
  if (rows.length === 0) notFound();
  return <ReviewEditor initialData={rows[0]} />;
}