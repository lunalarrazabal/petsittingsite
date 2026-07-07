'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';
import Button from '@/components/ui/Button';

export default function ReviewsClient() {
  const { t } = useLanguage();
  const r = t.reviews;

  return (
    <div className="py-7 sm:py-10">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
          {r.badge}
        </span>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold text-slate-900 sm:text-4xl">
          {r.title}
        </h1>
        <p className="mt-3 text-base text-slate-500">{r.subtitle}</p>
      </div>

      {/* Reviews grid */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* CTA to leave a review */}
      <div className="mx-auto mt-12 max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-slate-100 px-8 py-8">
          <p className="text-2xl">⭐</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-xl font-bold text-slate-900">
            Had a great experience?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            I&apos;d love to hear from you! Your feedback helps other pet families find trusted care.
          </p>
          <div className="mt-5">
            <Button href="/contact" size="lg">Leave a Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
