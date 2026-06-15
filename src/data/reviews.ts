// ✏️ ADD YOUR CLIENT REVIEWS HERE
// Each review object has English and French text.
// To add a review: copy one object, change the values, save the file.

import type { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Owl P.',
    rating: 5,
    serviceEn: 'Boarding',
    serviceFr: 'Pension',
    textEn:
      "Luna took good care of my dog and cat while I was away. She was reliable and followed the instructions I left for my pets' care. I appreciate that she still picked up & dropped off my pets despite not having access to a car as previously planned. Everything was well looked after and my pets were in good hands.",
    textFr:
      "Luna a très bien pris soin de mon chien et de mon chat pendant mon absence. Elle a été fiable et a suivi les instructions que j'avais laissées pour leurs soins. J'apprécie qu'elle ait tout de même récupéré et ramené mes animaux malgré le fait de ne pas avoir accès à une voiture comme prévu initialement. Tout a été bien géré et mes animaux étaient entre de bonnes mains.",
    date: '2025-08-05',
  },
  {
    id: '2',
    name: 'Fanta G.',
    rating: 5,
    serviceEn: 'Boarding',
    serviceFr: 'Pension',
    textEn:
      "This was our first time with Luna and I will highly recommend her. She took great care of our dog and kept us updated regularly with photos and messages. She is friendly, great with communication and I can tell that my dog was very happy with her while we were away for 14 days. I'm saving her page and will certainly be using her services again in the near future.",
    textFr:
      "C'était notre première fois avec Luna et je la recommande vivement. Elle a très bien pris soin de notre chien et nous a tenus informés régulièrement avec des photos et des messages. Elle est sympathique, communique très bien, et je voyais bien que notre chien était très heureux avec elle pendant nos 14 jours d'absence. Je garde sa page en favori et je referai certainement appel à ses services bientôt.",
    date: '2025-07-31',
    replyEn: 'Thank you Fanta :)',
    replyFr: 'Merci Fanta :)',
  },
  {
    id: '3',
    name: 'Adriana S.',
    rating: 5,
    serviceEn: 'Doggy Day Care',
    serviceFr: 'Garderie',
    textEn: 'She was very good and attentive. I think my dog had a great time staying with her.',
    textFr: 'Elle a été très bonne et attentionnée. Je pense que mon chien a passé un excellent moment avec elle.',
    date: '2025-07-22',
  },
  {
    id: '4',
    name: 'Christine Tina L.',
    pet: 'Paris',
    rating: 5,
    serviceEn: 'Boarding',
    serviceFr: 'Pension',
    textEn:
      "Luna was accommodating to my last minute booking. She brought my pup for long walks and brought her to her mom's and she enjoyed spending the day in the backyard. Paris was well looked after and she followed my instructions and guidelines accordingly. Would definitely rebook her again.",
    textFr:
      "Luna a été très accommodante pour ma réservation de dernière minute. Elle a emmené ma chienne pour de longues promenades et l'a amenée chez sa mère où elle a passé la journée dans la cour. Paris a été très bien soignée et Luna a suivi mes instructions à la lettre. Je la réserverais certainement à nouveau.",
    date: '2024-07-15',
  },
  {
    id: '5',
    name: 'Lili B.',
    rating: 5,
    textEn:
      'I left my dog with Luna for two weeks. It was my first time leaving him and everything went well. She was very responsive and sent me daily updates. I would definitely book again with her.',
    textFr:
      "J'ai laissé mon chien avec Luna pendant deux semaines. C'était la première fois que je le laissais et tout s'est très bien passé. Elle a été très réactive et m'a envoyé des nouvelles tous les jours. Je réserverais certainement à nouveau avec elle.",
    date: '2024-03-06',
  },
  {
    id: '6',
    name: 'Emiliano G.',
    rating: 5,
    textEn:
      "Luna provided top-notch care for my cat, going above and beyond by purchasing snacks and sending regular photo updates. Luna's excellent communication skills gave me peace of mind throughout my travels. I highly recommend her services to anyone in need of a reliable and caring pet-sitter.",
    textFr:
      "Luna a offert des soins exceptionnels à mon chat, allant même jusqu'à acheter des friandises et envoyer des photos régulièrement. Son excellente communication m'a donné une grande tranquillité d'esprit pendant tout mon voyage. Je recommande vivement ses services à toute personne cherchant une gardienne fiable et attentionnée.",
    date: '2024-03-06',
  },
  {
    id: '7',
    name: 'Bosen Q.',
    rating: 5,
    serviceEn: 'Boarding',
    serviceFr: 'Pension',
    textEn: 'Luna responds message timely and takes care of our dog very well. I would strongly recommend her.',
    textFr: 'Luna répond aux messages rapidement et prend très bien soin de notre chien. Je la recommande fortement.',
    date: '2024-03-02',
  },
];
