'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Button from '@/components/ui/Button';

export default function GalleryClient() {
  const { t } = useLanguage();
  const g = t.gallery;

  return (
    <div className="py-16 sm:py-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700">
          {g.badge}
        </span>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold text-stone-900 sm:text-5xl">
          {g.title}
        </h1>
        <p className="mt-4 text-lg text-stone-500">{g.subtitle}</p>

        {/* Instagram note */}
        <p className="mt-3 text-sm font-medium text-rose-600">{g.instagramNote}</p>
      </div>

      {/* Photo grid */}
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <PhotoGrid />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-xl px-4 text-center sm:px-6">
        <p className="text-stone-500">
          Want your pet featured here? Book a service and I&apos;ll send you adorable photos!
        </p>
        <div className="mt-4">
          <Button href="/booking" size="lg">Book Now</Button>
        </div>
      </div>
    </div>
  );
}
