'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { galleryPhotos } from '@/data/gallery';

const GRID_SIZES =
  '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

// Lightbox — a full-screen overlay that shows the selected photo enlarged,
// with keyboard + button navigation between photos.
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { language } = useLanguage();
  const photo = galleryPhotos[index];
  const alt = language === 'en' ? photo.altEn : photo.altFr;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
        aria-label="Previous photo"
      >
        ‹
      </button>

      <div
        className="relative max-h-[85vh] w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photo.id}
          src={photo.src}
          alt={alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 60vw, 90vw"
          className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  );
}

export default function PhotoGrid() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + galleryPhotos.length) % galleryPhotos.length));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % galleryPhotos.length));
  }, []);

  return (
    <>
      {/* Responsive masonry-style grid using CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {galleryPhotos.map((photo, index) => {
          const alt = language === 'en' ? photo.altEn : photo.altFr;
          return (
            <button
              key={photo.id}
              onClick={() => setActiveIndex(index)}
              className="group mb-4 block w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100 transition-shadow duration-200 hover:shadow-lg focus-visible:outline-blue-500"
              aria-label={`View larger: ${alt}`}
            >
              <Image
                src={photo.src}
                alt={alt}
                width={photo.width}
                height={photo.height}
                sizes={GRID_SIZES}
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox overlay */}
      {activeIndex !== null && (
        <Lightbox
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}
