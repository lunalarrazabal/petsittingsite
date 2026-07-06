import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Luna Larrazabal, professional pet sitter in Montreal. Ask about pet boarding, doggy day care, or dog walking services.',
};

export default function ContactPage() {
  return <ContactClient />;
}
