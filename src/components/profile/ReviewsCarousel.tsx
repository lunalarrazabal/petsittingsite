'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/reviews/ReviewCard';

export default function ReviewsCarousel() {
  const { t } = useLanguage();
  const p = t.homeProfile;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    // gap-6 = 24px
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 320;
    el.scrollBy({ left: direction === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="border-y border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{p.reviewsHeading}</p>
            <h2 className="mt-2 flex items-center gap-2 font-[var(--font-playfair)] text-2xl font-medium text-ink sm:text-3xl">
              <Star className="h-5 w-5 fill-sage text-sage" aria-hidden="true" />
              {p.ratingSummary}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-1">
            <button
              onClick={() => scrollBy('left')}
              aria-label={t.booking.prevMonth}
              className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-surface active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              aria-label={t.booking.nextMonth}
              className="flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-surface active:scale-95"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontally scrollable carousel with snap */}
        <div
          ref={scrollRef}
          className="carousel-scroll mt-8 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-[min(calc(100%-1.5rem),340px)] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
