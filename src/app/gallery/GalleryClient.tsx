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
        <p className="eyebrow">{g.badge}</p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-medium text-ink sm:text-5xl">
          {g.title}
        </h1>
        <p className="mt-4 text-base text-muted">{g.subtitle}</p>

        {/* Instagram note */}
        <p className="mt-2 text-sm font-medium text-sage-deep">{g.instagramNote}</p>
      </div>

      {/* Photo grid */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <PhotoGrid />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-xl px-4 text-center sm:px-6">
        <p className="text-muted">
          Want your pet featured here? Book a service and I&apos;ll send you adorable photos!
        </p>
        <div className="mt-5">
          <Button href="/booking" size="lg">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
