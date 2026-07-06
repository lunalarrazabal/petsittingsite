// Services page — shows all pricing cards.
// The data (prices, features) comes from src/data/services.ts — edit that file to change prices.

import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Professional pet sitting services in Montreal by Luna Larrazabal: pet boarding ($40/night), doggy day care ($40/day), and dog walking ($28/walk). Transparent pricing, loving care.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
