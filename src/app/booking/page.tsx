import type { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book a Service',
  description:
    'Request a pet sitting booking with Luna Larrazabal in Montreal. Dog walking, drop-in visits, overnight sitting, and pet boarding. Fast 24-hour confirmation.',
};

export default function BookingPage() {
  return <BookingClient />;
}
