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
    // gap-4 = 16px
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 320;
    el.scrollBy({ left: direction === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
            {p.reviewsHeading}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Star className="h-4 w-4 fill-brand-600 text-brand-600" aria-hidden="true" />
            {p.ratingSummary}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          <button
            onClick={() => scrollBy('left')}
            aria-label={t.booking.prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" aria-hidden="true" />
          </button>
          <button
            onClick={() => scrollBy('right')}
            aria-label={t.booking.nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontally scrollable carousel with snap */}
      <div
        ref={scrollRef}
        className="carousel-scroll mt-5 flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-[min(calc(100%-1.5rem),340px)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </section>
  );
}
