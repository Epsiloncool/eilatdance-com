import { AboutUs } from '@/components/AboutUs';
//import { useLanguage } from '@/contexts/LanguageContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Eilat Dance Center - our story, mission, and passion for dance education in Eilat.',
};

export default function AboutPage() {
  return (
    <>
      <AboutUs />
    </>
  );
}