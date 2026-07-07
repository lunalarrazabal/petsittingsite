// ✏️ EDIT YOUR PRICES AND SERVICE DETAILS HERE
// This file controls the Services page, the homepage card, and the booking form.

import type { Service } from '@/types';

export const services: Service[] = [
  // ─── Dog Services ─────────────────────────────────────────────────────────
  {
    id: 'dog-boarding',
    category: 'dog',
    nameEn: 'Dog Boarding',
    nameFr: 'Pension pour chiens',
    descriptionEn: 'Your dog stays overnight in my home with personalised care in a calm, safe environment.',
    descriptionFr: 'Votre chien séjourne chez moi pour la nuit avec des soins personnalisés dans un environnement calme et sécuritaire.',
    price: '45',
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
  },
  {
    id: 'dog-daycare',
    category: 'dog',
    nameEn: 'Dog Daycare',
    nameFr: 'Garderie pour chiens',
    descriptionEn: 'A fun, active day at my place while you are away — walks, playtime, and lots of attention.',
    descriptionFr: "Une journée active et amusante chez moi pendant votre absence — promenades, jeux et beaucoup d'attention.",
    price: '40',
    unit: 'per day',
    featuresEn: [
      'Full day in my home',
      'Walks & playtime',
      'Photo updates throughout the day',
      'Comfortable, supervised space',
    ],
    featuresFr: [
      'Journée complète chez moi',
      'Promenades et jeux',
      'Photos tout au long de la journée',
      'Espace confortable et supervisé',
    ],
  },
  {
    id: 'dog-walking',
    category: 'dog',
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
  },

  // ─── Cat Services ──────────────────────────────────────────────────────────
  {
    id: 'cat-boarding',
    category: 'cat',
    nameEn: 'Cat Boarding',
    nameFr: 'Pension pour chats',
    descriptionEn: 'Your cat enjoys a relaxed, quiet stay at my home with comfortable spaces and attentive care.',
    descriptionFr: "Votre chat profite d'un séjour calme et relaxant chez moi avec des espaces confortables et des soins attentionnés.",
    price: '28',
    unit: 'per night',
    featuresEn: [
      'Overnight stay in my home',
      'Quiet, cat-friendly environment',
      'Daily photos & updates',
      'Feeding & litter box care',
    ],
    featuresFr: [
      'Séjour de nuit chez moi',
      'Environnement calme adapté aux chats',
      'Photos et nouvelles quotidiennes',
      'Alimentation et litière',
    ],
  },

  // ─── Additional Pets (add-ons) ─────────────────────────────────────────────
  {
    id: 'additional-dog',
    category: 'addon',
    nameEn: 'Additional Dog',
    nameFr: 'Chien supplémentaire',
    descriptionEn: 'Add a second or third dog to any booking.',
    descriptionFr: 'Ajoutez un deuxième ou troisième chien à toute réservation.',
    price: '20',
    unit: 'per night',
    featuresEn: ['Add-on to any dog service'],
    featuresFr: ['Supplément à tout service pour chien'],
  },
  {
    id: 'additional-cat',
    category: 'addon',
    nameEn: 'Additional Cat',
    nameFr: 'Chat supplémentaire',
    descriptionEn: 'Add a second or third cat to any cat boarding booking.',
    descriptionFr: 'Ajoutez un deuxième ou troisième chat à toute réservation de pension.',
    price: '15',
    unit: 'per night',
    featuresEn: ['Add-on to cat boarding'],
    featuresFr: ['Supplément à la pension pour chat'],
  },

  // ─── Transportation (add-ons) ──────────────────────────────────────────────
  {
    id: 'pickup',
    category: 'transport',
    nameEn: 'Pick-up Service',
    nameFr: 'Service de ramassage',
    descriptionEn: 'I pick up your pet from your home at the start of their stay.',
    descriptionFr: 'Je récupère votre animal chez vous au début de son séjour.',
    price: '50',
    unit: 'one way',
    featuresEn: ['Pick-up from your home address'],
    featuresFr: ['Ramassage à votre domicile'],
  },
  {
    id: 'dropoff',
    category: 'transport',
    nameEn: 'Drop-off Service',
    nameFr: 'Service de dépôt',
    descriptionEn: 'I return your pet to your home at the end of their stay.',
    descriptionFr: 'Je ramène votre animal chez vous à la fin de son séjour.',
    price: '50',
    unit: 'one way',
    featuresEn: ['Drop-off at your home address'],
    featuresFr: ['Retour à votre domicile'],
  },
];

// Weekly rates applied automatically for stays of 7 consecutive days or more.
export const longTermRates = {
  dogBoardingWeekly: '250',
  catBoardingWeekly: '175',
  minimumDays: 7,
};
