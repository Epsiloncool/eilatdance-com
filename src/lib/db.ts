import { Post } from '@/types/post';
import { ScheduleItem } from '@/types/schedule_item';
import { User } from '@/types/user';
import mysql, { RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

export interface BlogPost extends RowDataPacket, Post {
	//
}

export interface DanceStyle extends RowDataPacket {
	id: number;
	name: object;
	description: object;
	level: string;
	image_url: string;
	gradient: string;
	created_at: string;
}

export interface ScheduleItemRow extends RowDataPacket, ScheduleItem {}

export interface UserRow extends RowDataPacket, User {}

// Хелпер для получения перевода с фоллбэком на английский
export function getLocalizedText(field: any, lang: string): string {
  if (!field) return '';
  
  // Если поле пришло как строка (иногда драйвер mysql возвращает JSON как string)
  let data = field;
  if (typeof field === 'string') {
    try {
      data = JSON.parse(field);
    } catch (e) {
      return field; // Возвращаем как есть, если это не JSON
    }
  }

  // Логика фоллбэка: Текущий язык -> Английский -> Первый доступный ключ -> Пусто
  return data[lang] || data['en'] || Object.values(data)[0] || '';
}