import { NextResponse } from 'next/server';
import { scanTranslations } from '@/lib/scanner';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Запускаем сканер
    const stats = await scanTranslations();
    
    // Сбрасываем кэш, чтобы новые переводы подтянулись (если используются в layout)
    revalidatePath('/', 'layout');

    return NextResponse.json({ 
      success: true, 
      stats 
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
