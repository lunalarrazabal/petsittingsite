// Services page — shows all pricing cards.
// The data (prices, features) comes from src/data/services.ts — edit that file to change prices.

import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Professional pet sitting services in Montreal: dog walking ($20), drop-in visits ($25), overnight sitting ($75), and pet boarding ($65/night). Transparent pricing, loving care.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
