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
  const service = language === 'en' ? review.serviceEn : review.serviceFr;
  const reply = language === 'en' ? review.replyEn : review.replyFr;

  // Format date as "November 2024"
  const dateFormatted = new Date(review.date).toLocaleDateString(
    language === 'en' ? 'en-CA' : 'fr-CA',
    { month: 'long', year: 'numeric' }
  );

  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      {/* Stars + service tag */}
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={review.rating} size="md" />
        {service && (
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
            {service}
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Reply from Luna, if any */}
      {reply && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          <p className="mb-1 text-xs font-semibold text-slate-900">{t.reviews.replyLabel}</p>
          <p>{reply}</p>
        </div>
      )}

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 border-t border-slate-50 pt-4">
        {/* Avatar — initial in a circle */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{review.name}</p>
          <p className="truncate text-xs text-slate-400">
            {review.pet ? `${t.reviews.petLabel} ${review.pet} · ` : ''}
            {dateFormatted}
          </p>
        </div>
      </div>
    </article>
  );
}
