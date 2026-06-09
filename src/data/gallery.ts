// ✏️ ADD YOUR PET PHOTOS HERE
//
// HOW TO ADD YOUR OWN PHOTOS:
// 1. Put your photos in the folder: public/images/gallery/
// 2. Name them like: photo-1.jpg, photo-2.jpg, etc.
// 3. Update the `src` field below to: '/images/gallery/photo-1.jpg'
// 4. Set the correct width and height of your photo in pixels.
//
// The photos below are PLACEHOLDERS — replace them with your real pet photos!

import type { GalleryPhoto } from '@/types';

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: '1',
    src: 'https://placedog.net/600/400?id=1',
    altEn: 'Happy dog enjoying a walk in Montreal',
    altFr: 'Chien heureux lors d\'une promenade à Montréal',
    width: 600,
    height: 400,
  },
  {
    id: '2',
    src: 'https://placekitten.com/600/450',
    altEn: 'Cozy cat relaxing at home',
    altFr: 'Chat confortable se relaxant à la maison',
    width: 600,
    height: 450,
  },
  {
    id: '3',
    src: 'https://placedog.net/600/500?id=3',
    altEn: 'Playful puppy during a boarding stay',
    altFr: 'Chiot joueur pendant un séjour en pension',
    width: 600,
    height: 500,
  },
  {
    id: '4',
    src: 'https://placekitten.com/500/600',
    altEn: 'Cute cat getting some love and attention',
    altFr: 'Joli chat recevant de l\'amour et de l\'attention',
    width: 500,
    height: 600,
  },
  {
    id: '5',
    src: 'https://placedog.net/600/400?id=5',
    altEn: 'Dog running in the park',
    altFr: 'Chien courant dans le parc',
    width: 600,
    height: 400,
  },
  {
    id: '6',
    src: 'https://placedog.net/500/500?id=6',
    altEn: 'Dog looking out the window',
    altFr: 'Chien regardant par la fenêtre',
    width: 500,
    height: 500,
  },
  {
    id: '7',
    src: 'https://placekitten.com/600/400',
    altEn: 'Two cats napping together',
    altFr: 'Deux chats faisant la sieste ensemble',
    width: 600,
    height: 400,
  },
  {
    id: '8',
    src: 'https://placedog.net/600/450?id=8',
    altEn: 'Golden retriever on an autumn walk',
    altFr: 'Golden retriever lors d\'une promenade automnale',
    width: 600,
    height: 450,
  },
];
