// ✏️ EDIT YOUR PRICES AND SERVICE DETAILS HERE
// This file controls everything on the Services page (and the homepage rates card).

import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'boarding',
    icon: '🏠',
    nameEn: 'Pet Boarding',
    nameFr: 'Pension pour animaux',
    descriptionEn: 'Your pet stays overnight in my home, with personalized care in a calm, comfortable space.',
    descriptionFr: 'Votre animal séjourne chez moi pour la nuit, avec des soins personnalisés dans un espace calme et confortable.',
    price: '40',
    unit: 'per night',
    featuresEn: [
      'Overnight stay in my home',
      'Daily walks & playtime',
      'Photo & text updates',
      'Up to 3 pets per night',
    ],
    featuresFr: [
      'Séjour de nuit chez moi',
      'Promenades et jeux quotidiens',
      'Photos et messages de suivi',
      "Jusqu'à 3 animaux par nuit",
    ],
    popular: false,
  },
  {
    id: 'doggy-daycare',
    icon: '☀️',
    nameEn: 'Doggy Day Care',
    nameFr: 'Garderie pour chiens',
    descriptionEn: 'A fun, active day in my home while you’re away — playtime, walks, and lots of attention.',
    descriptionFr: 'Une journée active et amusante chez moi pendant votre absence — jeux, promenades et beaucoup d’attention.',
    price: '40',
    unit: 'per day',
    featuresEn: [
      'Full day in my home',
      'Walks & playtime',
      'Photo updates',
      'Comfortable, supervised space',
    ],
    featuresFr: [
      'Journée complète chez moi',
      'Promenades et jeux',
      'Photos de suivi',
      'Espace confortable et supervisé',
    ],
    popular: false,
  },
  {
    id: 'dog-walking',
    icon: '🐕',
    nameEn: 'Dog Walking',
    nameFr: 'Promenade de chien',
    descriptionEn: 'A refreshing walk around your neighbourhood to keep your dog active and happy.',
    descriptionFr: 'Une promenade rafraîchissante dans votre quartier pour garder votre chien actif et heureux.',
    price: '28',
    unit: 'per walk',
    featuresEn: [
      'Walk in your neighbourhood',
      'Fresh water & a quick check-in',
      'Photo update after the walk',
      'Flexible scheduling',
    ],
    featuresFr: [
      'Promenade dans votre quartier',
      'Eau fraîche et petite vérification',
      'Photo après la promenade',
      'Horaire flexible',
    ],
    popular: false,
  },
];
