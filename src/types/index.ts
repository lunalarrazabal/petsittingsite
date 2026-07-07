export type Language = 'en' | 'fr';

export type ServiceCategory = 'dog' | 'cat' | 'addon' | 'transport';

export interface Service {
  id: string;
  category: ServiceCategory;
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
  pet?: string;
  rating: number;
  serviceEn?: string;
  serviceFr?: string;
  textEn: string;
  textFr: string;
  date: string;
  replyEn?: string;
  replyFr?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  altEn: string;
  altFr: string;
  width: number;
  height: number;
}
