import { scanTranslations } from '../src/lib/scanner';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Загружаем .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  console.log('Starting translation scan...');

  // Создаем отдельный пул для скрипта
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });

  try {
    const stats = await scanTranslations(pool);
    console.log('--------------------------------');
    console.log('Scan Complete!');
    console.log(`Files scanned: ${stats.filesScanned}`);
    console.log(`New phrases:   ${stats.newPhrases}`);
    console.log(`New refs:      ${stats.newRefs}`);
    console.log(`Updated refs:  ${stats.updatedRefs}`);
    console.log(`Deleted refs:  ${stats.deletedRefs}`);
    console.log('--------------------------------');
  } catch (error) {
    console.error('Scan failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

run();
