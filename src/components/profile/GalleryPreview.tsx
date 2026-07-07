'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { galleryPhotos } from '@/data/gallery';

const PREVIEW_IDS = ['2', '5', '10', '13', '15', '25'];

export default function GalleryPreview() {
  const { t, language } = useLanguage();

  const photos = PREVIEW_IDS.map(
    (id) => galleryPhotos.find((p) => p.id === id) ?? galleryPhotos[0]
  );

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-slate-900 sm:text-3xl">
          {t.gallery.title}
        </h2>
        <Link
          href="/gallery"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          {t.homeProfile.viewAll}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-1 text-sm text-slate-500">{t.gallery.subtitle}</p>

      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {photos.map((photo, i) => {
          const alt = language === 'en' ? photo.altEn : photo.altFr;
          const isLast = i === photos.length - 1;

          return (
            <Link
              key={photo.id}
              href="/gallery"
              className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-blue-500"
              aria-label={isLast ? `${t.homeProfile.photosLabel} — ${t.homeProfile.viewAll}` : alt}
            >
              <Image
                src={photo.src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 33vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isLast && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-slate-950/55 text-center text-white">
                  <span className="text-lg font-bold leading-none">{galleryPhotos.length}</span>
                  <span className="text-xs font-medium">{t.homeProfile.photosLabel}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
