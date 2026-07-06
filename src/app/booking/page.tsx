import type { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book a Service',
  description:
    'Request a pet sitting booking with Luna Larrazabal in Montreal. Pet boarding ($40/night), doggy day care ($40/day), and dog walking ($28/walk). 24-hour confirmation.',
};

export default function BookingPage() {
  return <BookingClient />;
}
