import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';
import { RowDataPacket } from 'mysql2';

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

    // Получаем инфо о файле
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM medias WHERE id = ?', [id]);
    if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const media = rows[0];
    const baseDir = path.join(process.cwd(), 'public', media.base_dir);

    // Удаляем оригинал
    try {
      await unlink(path.join(baseDir, media.orig_filename));
    } catch (e) { console.error('Error deleting original file', e); }

    // Удаляем превью
    if (media.previews) {
      const previews = typeof media.previews === 'string' ? JSON.parse(media.previews) : media.previews;
      for (const p of previews) {
        try {
          await unlink(path.join(baseDir, p.filename));
        } catch (e) { console.error('Error deleting preview', e); }
      }
    }

    // Удаляем из БД
    await pool.execute('DELETE FROM medias WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}