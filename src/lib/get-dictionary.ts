import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { unstable_cache } from 'next/cache';

export type Dictionary = Record<string, Record<string, string>>;

// Эта функция выполняется только на сервере
const fetchTranslationsFromDB = async (): Promise<Dictionary> => {
  try {
    // Выбираем все переводы
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT t.ident, tt.lang, tt.phrase_text 
      FROM translation_texts tt
      JOIN translations t ON tt.phrase_id = t.id
    `);

    // Группируем по языкам
    const dictionary: Dictionary = {
      en: {},
      ru: {},
      he: {},
    };

    rows.forEach((row) => {
      const { ident, lang, phrase_text } = row;
      // Если язык неизвестный (например добавили fr), создаем под него объект
      if (!dictionary[lang]) dictionary[lang] = {};
      
      dictionary[lang][ident] = phrase_text;
    });

    return dictionary;
  } catch (error) {
    console.error('Failed to fetch translations:', error);
    return { en: {}, ru: {}, he: {} };
  }
};

// Обертка с кэшированием
// Данные будут закэшированы с тегом 'translations'
// Мы можем инвалидировать этот тег при обновлении в админке
export const getDictionary = unstable_cache(
  async () => fetchTranslationsFromDB(),
  ['site-translations'], // Key parts
  { tags: ['translations'], revalidate: 3600 } // Revalidate раз в час на всякий случай или по тегу
);
