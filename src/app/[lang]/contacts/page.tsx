import { Contacts } from '@/components/Contacts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Visit Eilat Dance Center. Find our location, opening hours, contact information, and payment options. Come dance with us in beautiful Eilat.',
};

export default function ContactsPage() {
  return (
    <>
      <Contacts />
    </>
  );
}