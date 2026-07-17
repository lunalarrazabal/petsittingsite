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
    <article className="flex h-full flex-col border-t border-line pt-6">
      {/* Stars + service tag */}
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={review.rating} size="sm" />
        {service && <span className="eyebrow text-faint">{service}</span>}
      </div>

      {/* Quote */}
      <blockquote className="mt-4 flex-1 font-[var(--font-playfair)] text-lg italic leading-snug text-ink">
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Reply from Luna, if any */}
      {reply && (
        <div className="mt-4 border-l-2 border-line pl-4 text-sm leading-relaxed text-muted">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-faint">
            {t.reviews.replyLabel}
          </p>
          <p>{reply}</p>
        </div>
      )}

      {/* Author */}
      <div className="mt-5 text-xs uppercase tracking-[0.1em] text-faint">
        {review.name}
        {review.pet ? ` · ${t.reviews.petLabel} ${review.pet}` : ''} · {dateFormatted}
      </div>
    </article>
  );
}
