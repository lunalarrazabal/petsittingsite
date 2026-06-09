'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';
import Button from '@/components/ui/Button';

export default function ReviewsClient() {
  const { t } = useLanguage();
  const r = t.reviews;

  const averageRating =
    reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;

  return (
    <div className="py-16 sm:py-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
          {r.badge}
        </span>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl">
          {r.title}
        </h1>
        <p className="mt-4 text-lg text-stone-500">{r.subtitle}</p>

        {/* Overall rating summary */}
        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl bg-amber-50 px-8 py-4 ring-1 ring-amber-100">
          <p className="text-5xl font-extrabold text-amber-500">
            {averageRating.toFixed(1)}
          </p>
          <div className="text-left">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${
                    i < Math.round(averageRating)
                      ? 'text-amber-400'
                      : 'text-stone-200'
                  }`}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-0.5 text-sm text-stone-500">
              Based on {reviews.length} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* CTA to leave a review */}
      <div className="mx-auto mt-16 max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-stone-100 px-8 py-10">
          <p className="text-2xl">⭐</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-bold text-stone-900">
            Had a great experience?
          </h2>
          <p className="mt-2 text-stone-500">
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
