import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Luna Larrazabal, professional pet sitter in Montreal. Ask about dog walking, drop-in visits, overnight sitting, or pet boarding.',
};

export default function ContactPage() {
  return <ContactClient />;
}
