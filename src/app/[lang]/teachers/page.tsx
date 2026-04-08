import { Instructors } from '@/components/Instructors';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Teachers',
  description: 'Meet our professional dance instructors - Sofia and Maxim. Learn from passionate experts with years of experience in Hip-hop, Jazz, Ballet, and Tango.',
};

export default function TeachersPage() {
  return (
    <>
      <Instructors />
    </>
  );
}