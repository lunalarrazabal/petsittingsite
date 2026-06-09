'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { type Review } from '@/types';
import StarRating from '@/components/ui/StarRating';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { t, language } = useLanguage();

  const text = language === 'en' ? review.textEn : review.textFr;

  // Format date as "November 2024"
  const dateFormatted = new Date(review.date).toLocaleDateString(
    language === 'en' ? 'en-CA' : 'fr-CA',
    { month: 'long', year: 'numeric' }
  );

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
      {/* Stars */}
      <StarRating rating={review.rating} size="md" />

      {/* Quote */}
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 border-t border-stone-50 pt-4">
        {/* Avatar — initial in a circle */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700"
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-stone-900">{review.name}</p>
          <p className="truncate text-xs text-stone-400">
            {t.reviews.petLabel} {review.pet} · {dateFormatted}
          </p>
        </div>
      </div>
    </article>
  );
}
