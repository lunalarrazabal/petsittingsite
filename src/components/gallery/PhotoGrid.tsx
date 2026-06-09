'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { galleryPhotos } from '@/data/gallery';

// Lightbox — a full-screen overlay that shows the selected photo enlarged
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
        aria-label="Close"
      >
        ✕
      </button>
      <div
        className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={600}
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
}

export default function PhotoGrid() {
  const { language } = useLanguage();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <>
      {/* Responsive masonry-style grid using CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {galleryPhotos.map((photo) => {
          const alt = language === 'en' ? photo.altEn : photo.altFr;
          return (
            <button
              key={photo.id}
              onClick={() => openLightbox(photo.src, alt)}
              className="mb-4 block w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-100 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md focus-visible:outline-rose-500"
              aria-label={`View larger: ${alt}`}
            >
              <Image
                src={photo.src}
                alt={alt}
                width={photo.width}
                height={photo.height}
                className="h-auto w-full object-cover"
                unoptimized
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox overlay */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  );
}
