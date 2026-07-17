'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';
import Button from '@/components/ui/Button';

export default function ReviewsClient() {
  const { t } = useLanguage();
  const r = t.reviews;
  const p = t.homeProfile;

  const [ratingValue] = p.ratingSummary.split(' · ');

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow">{r.badge}</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-medium text-ink sm:text-5xl">
          {r.title}
        </h1>
        <p className="mt-4 text-base text-muted">{r.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:items-start">
        {/* Sticky stats sidebar */}
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">{p.reviewsHeading}</p>
          <div className="mt-3 font-[var(--font-playfair)] text-7xl leading-none text-ink">
            {ratingValue}
          </div>
          <div className="mt-2 text-lg tracking-[0.3em] text-sage">★★★★★</div>
          <p className="mt-4 text-sm text-muted">{p.ratingSummary}</p>

          <div className="mt-7 flex flex-col gap-3">
            <div className="border-t border-line pt-3 text-xs text-muted">{p.responseRate}</div>
            <div className="border-t border-line pt-3 text-xs text-muted">{p.repeatClients}</div>
            <div className="border-t border-line pt-3 text-xs text-muted">{p.photoUpdates}</div>
          </div>
        </div>

        {/* Stacked review list */}
        <div className="flex flex-col gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* CTA to leave a review */}
      <div className="mx-auto mt-14 max-w-2xl px-4 text-center sm:px-6">
        <div className="border border-line bg-surface px-8 py-10">
          <h2 className="font-[var(--font-playfair)] text-2xl text-ink">
            Had a great experience?
          </h2>
          <p className="mt-2 text-sm text-muted">
            I&apos;d love to hear from you! Your feedback helps other pet families find trusted
            care.
          </p>
          <div className="mt-6">
            <Button href="/contact" size="lg">
              Leave a Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
