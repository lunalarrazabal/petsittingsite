'use client';

import Image from 'next/image';
import Link from 'next/link';
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
        <h2 className="font-[var(--font-playfair)] text-2xl font-medium text-ink sm:text-3xl">
          {t.gallery.title}
        </h2>
        <Link href="/gallery" className="btn-underline shrink-0 text-ink">
          {t.homeProfile.viewAll}
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted">{t.gallery.subtitle}</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {photos.map((photo, i) => {
          const alt = language === 'en' ? photo.altEn : photo.altFr;
          const isLast = i === photos.length - 1;

          return (
            <Link
              key={photo.id}
              href="/gallery"
              className="frame group relative block aspect-[3/2] bg-line"
              aria-label={isLast ? `${t.homeProfile.photosLabel} — ${t.homeProfile.viewAll}` : alt}
            >
              <Image
                src={photo.src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 33vw, 33vw"
                className="object-cover"
              />
              {isLast && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-ink/55 text-center text-surface">
                  <span className="font-[var(--font-playfair)] text-xl leading-none">
                    {galleryPhotos.length}
                  </span>
                  <span className="text-xs uppercase tracking-[0.1em]">
                    {t.homeProfile.photosLabel}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
