import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Browse photos of happy pets cared for by Montreal Pet Care. Dog walks, cozy stays, and adorable moments captured by Luna Larrazabal.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
