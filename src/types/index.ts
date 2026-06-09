export type Language = 'en' | 'fr';

export interface Service {
  id: string;
  icon: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  price: string;
  unit: string;
  featuresEn: string[];
  featuresFr: string[];
  popular?: boolean;
}

export interface Review {
  id: string;
  name: string;
  pet: string;
  rating: number;
  textEn: string;
  textFr: string;
  date: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  altEn: string;
  altFr: string;
  width: number;
  height: number;
}
