import { Schedule } from '@/components/Schedule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class Schedule',
  description: 'View our weekly dance class schedule. Book your spot for Hip-hop, Jazz-funk, Ballet, Tango, and more. Classes available Monday through Sunday.',
};

export default function SchedulePage() {
  return (
    <>
      <Schedule />
    </>
  );
}