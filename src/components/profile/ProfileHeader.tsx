'use client';

import Image from 'next/image';
import { BadgeCheck, MapPin, Star, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Button from '@/components/ui/Button';

export default function ProfileHeader() {
  const { t } = useLanguage();
  const p = t.homeProfile;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
          <div className="h-full w-full overflow-hidden rounded-full shadow-md ring-4 ring-white">
            <Image
              src="/images/profile/profile-hero.webp"
              alt={p.name}
              width={112}
              height={112}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow">
            <BadgeCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
          </span>
        </div>

        <div>
          <h1 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
            {p.name}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {p.location}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Star className="h-4 w-4 fill-brand-600 text-brand-600" aria-hidden="true" />
            {p.ratingSummary}
          </p>
        </div>
      </div>

      <div className="sm:max-w-xs sm:text-right">
        <p className="text-sm leading-relaxed text-slate-600">{p.statusText}</p>
        <div className="mt-3 sm:flex sm:justify-end">
          <Button href="/booking" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            {p.bookCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
