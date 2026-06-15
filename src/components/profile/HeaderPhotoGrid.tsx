'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { galleryPhotos } from '@/data/gallery';

// A small, varied selection of photos for the header grid.
const HEADER_PHOTO_IDS = ['6', '9', '14', '16'];

export default function HeaderPhotoGrid() {
  const { t, language } = useLanguage();
  const p = t.homeProfile;

  const photos = HEADER_PHOTO_IDS.map(
    (id) => galleryPhotos.find((photo) => photo.id === id) ?? galleryPhotos[0]
  );

  return (
    <Link
      href="/gallery"
      className="mt-6 grid h-[360px] grid-cols-2 grid-rows-4 gap-2 overflow-hidden rounded-2xl sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2 sm:gap-3"
    >
      {/* Large photo, left */}
      <div className="relative col-span-2 row-span-2">
        <Image
          src={photos[0].src}
          alt={language === 'en' ? photos[0].altEn : photos[0].altFr}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Wide photo, top-right */}
      <div className="relative col-span-2">
        <Image
          src={photos[1].src}
          alt={language === 'en' ? photos[1].altEn : photos[1].altFr}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Bottom-right single cells */}
      <div className="relative">
        <Image
          src={photos[2].src}
          alt={language === 'en' ? photos[2].altEn : photos[2].altFr}
          fill
          sizes="(min-width: 640px) 16vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="relative">
        <Image
          src={photos[3].src}
          alt={language === 'en' ? photos[3].altEn : photos[3].altFr}
          fill
          sizes="(min-width: 640px) 16vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 text-center text-sm font-semibold text-white sm:text-base">
          {galleryPhotos.length} {p.photosLabel} · {p.viewAll}
        </div>
      </div>
    </Link>
  );
}
