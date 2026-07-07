'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';
import Button from '@/components/ui/Button';

export default function ReviewsClient() {
  const { t } = useLanguage();
  const r = t.reviews;

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
          {r.badge}
        </span>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl">
          {r.title}
        </h1>
        <p className="mt-3 text-lg text-slate-500">{r.subtitle}</p>
      </div>

      {/* Reviews grid */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* CTA to leave a review */}
      <div className="mx-auto mt-16 max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-slate-100 px-8 py-10">
          <p className="text-2xl">⭐</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-slate-900">
            Had a great experience?
          </h2>
          <p className="mt-2 text-slate-500">
            I&apos;d love to hear from you! Your feedback helps other pet families find trusted care.
          </p>
          <div className="mt-6">
            <Button href="/contact" size="lg">Leave a Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
