import { UserEditor } from '../UserEditor';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;

  // Запрашиваем данные пользователя из БД
  // ВАЖНО: Не запрашиваем password_hash для безопасности (он нам и не нужен в форме)
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT id, uuid, email, role, name, phone, bio, image_url, created_at, is_instructor, display_name FROM users WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    notFound();
  }

  const user = rows[0];

  return <UserEditor initialData={user} />;
}
