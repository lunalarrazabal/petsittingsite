'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Button from '@/components/ui/Button';

export default function GalleryClient() {
  const { t } = useLanguage();
  const g = t.gallery;

  return (
    <div className="py-10 sm:py-14">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
          {g.badge}
        </span>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-slate-900 sm:text-5xl">
          {g.title}
        </h1>
        <p className="mt-3 text-lg text-slate-500">{g.subtitle}</p>

        {/* Instagram note */}
        <p className="mt-2 text-sm font-medium text-brand-600">{g.instagramNote}</p>
      </div>

      {/* Photo grid */}
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <PhotoGrid />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-xl px-4 text-center sm:px-6">
        <p className="text-slate-500">
          Want your pet featured here? Book a service and I&apos;ll send you adorable photos!
        </p>
        <div className="mt-4">
          <Button href="/booking" size="lg">Book Now</Button>
        </div>
      </div>
    </div>
  );
}
