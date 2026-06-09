// This is the Home page — the first thing visitors see.
// It assembles the hero, services preview, reviews preview, and profile sections.

import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import ReviewsPreview from '@/components/home/ReviewsPreview';
import ProfileSection from '@/components/home/ProfileSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ReviewsPreview />
      <ProfileSection />
    </>
  );
}
