'use client';

import { Star } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';

export default function ReviewsModule() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
          {p.reviewsHeading}
        </h2>
        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <Star className="h-4 w-4 fill-brand-600 text-brand-600" aria-hidden="true" />
          {p.ratingSummary}
        </p>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
