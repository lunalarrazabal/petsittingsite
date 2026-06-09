// ✏️ ADD YOUR CLIENT REVIEWS HERE
// Each review object has English and French text.
// To add a review: copy one object, change the values, save the file.

import type { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sophie B.',
    pet: 'Max (Golden Retriever)',
    rating: 5,
    textEn:
      'Luna is absolutely wonderful with Max! He gets so excited every time she comes for his walk. She always sends cute photos and updates. Highly recommend!',
    textFr:
      "Luna est absolument merveilleuse avec Max ! Il est tellement excité à chaque fois qu'elle vient pour sa promenade. Elle envoie toujours des photos adorables. Je la recommande vivement !",
    date: '2024-11-15',
  },
  {
    id: '2',
    name: 'Marc T.',
    pet: 'Coco (French Bulldog)',
    rating: 5,
    textEn:
      "We've been using Luna's overnight sitting service for 6 months. She is reliable, professional, and our dog loves her. Our go-to sitter in Montreal!",
    textFr:
      'Nous utilisons le service de garde de nuit de Luna depuis 6 mois. Elle est fiable, professionnelle et notre chien l\'adore. Notre gardienne incontournable à Montréal !',
    date: '2024-10-28',
  },
  {
    id: '3',
    name: 'Amélie R.',
    pet: 'Luna & Mochi (Cats)',
    rating: 5,
    textEn:
      'Left both my cats with Luna for a week. She sent daily photos and kept us informed the whole time. Came back to two happy, well-cared-for cats. Thank you!',
    textFr:
      "J'ai laissé mes deux chats avec Luna pendant une semaine. Elle a envoyé des photos quotidiennes et nous a tenus informés. Revenue à deux chats heureux et bien soignés. Merci !",
    date: '2024-12-02',
  },
  {
    id: '4',
    name: 'David K.',
    pet: 'Biscuit (Labrador)',
    rating: 5,
    textEn:
      'Luna took care of Biscuit during a stressful move. She went above and beyond, keeping him calm and happy. Such a caring and dedicated sitter!',
    textFr:
      "Luna s'est occupée de Biscuit lors d'un déménagement stressant. Elle a fait plus que le nécessaire. Une gardienne si attentionnée et dévouée !",
    date: '2024-09-19',
  },
  {
    id: '5',
    name: 'Isabelle M.',
    pet: 'Peppa (Dachshund)',
    rating: 5,
    textEn:
      'Peppa is a nervous little dog but Luna knew exactly how to handle her. Patient, gentle, and experienced. We feel so lucky to have found her in our neighbourhood!',
    textFr:
      'Peppa est une petite chienne nerveuse mais Luna savait exactement comment la gérer. Patiente, douce et expérimentée. Nous avons tellement de chance de l\'avoir trouvée dans notre quartier !',
    date: '2024-11-30',
  },
  {
    id: '6',
    name: 'James W.',
    pet: 'Charlie (Beagle)',
    rating: 4,
    textEn:
      'Great service, very reliable and communicative. Charlie always comes home tired (in a good way!) after his walks. Will definitely book again.',
    textFr:
      'Excellent service, très fiable et communicatif. Charlie rentre toujours fatigué (dans le bon sens !) après ses promenades. Je réserverai certainement à nouveau.',
    date: '2024-10-10',
  },
];
