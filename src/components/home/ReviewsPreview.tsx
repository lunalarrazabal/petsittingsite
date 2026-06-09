'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import StarRating from '@/components/ui/StarRating';

export default function ReviewsPreview() {
  const { t, language } = useLanguage();
  const r = t.reviewsPreview;

  // Show only 3 reviews on the home page
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
            {r.badge}
          </span>
          <h2 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold text-stone-900 sm:text-4xl">
            {r.title}
          </h2>
          <p className="mt-3 text-stone-500 sm:text-lg">{r.subtitle}</p>
        </div>

        {/* Review cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100"
            >
              <StarRating rating={review.rating} size="sm" />
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                &ldquo;{language === 'en' ? review.textEn : review.textFr}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                {/* Avatar circle with initials */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{review.name}</p>
                  <p className="text-xs text-stone-400">{review.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full reviews page */}
        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center font-semibold text-rose-600 transition-colors hover:text-rose-700"
          >
            {r.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
