import type { Metadata } from 'next';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Client Reviews',
  description:
    'Read what Montreal pet parents say about Luna Larrazabal\'s pet sitting services. 5-star reviews for dog walking, overnight sitting, and pet boarding.',
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
