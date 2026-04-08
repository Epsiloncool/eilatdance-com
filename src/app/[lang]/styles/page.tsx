import { DanceStyles } from '@/components/DanceStyles';
import type { Metadata } from 'next';
import pool from '@/lib/db';
import { DanceStyle } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getStyles() {
  try {
    const [rows] = await pool.execute('SELECT * FROM dance_styles');
    return rows as DanceStyle[];
  } catch (e) { return []; }
}

export const metadata: Metadata = {
  title: 'Dance Styles',
  description: 'Explore our diverse range of dance classes: Hip-hop, Jazz-funk, Argentine Tango, Ballet, Contemporary, Stretching, and classes for kids. All levels welcome.',
};

export default async function StylesPage() {
  const styles = await getStyles();

  return (
    <>
      <DanceStyles styles={styles} />
    </>
  );
}