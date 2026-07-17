import ProfileHeader from '@/components/profile/ProfileHeader';
import TrustBadges from '@/components/profile/TrustBadges';
import HomeServicesSection from '@/components/profile/HomeServicesSection';
import AboutMeStats from '@/components/profile/AboutMeStats';
import SafetyEnvironment from '@/components/profile/SafetyEnvironment';
import GalleryPreview from '@/components/profile/GalleryPreview';
import ReviewsCarousel from '@/components/profile/ReviewsCarousel';
import BookingCTA from '@/components/profile/BookingCTA';

// Sections below alternate between full-width bordered bands (TrustBadges,
// ReviewsCarousel each provide their own edge-to-edge background/border and
// inner max-w-6xl container) and plain padded sections that share the
// wrapping containers here.
export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pt-16">
        <ProfileHeader />
      </div>

      <TrustBadges />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <HomeServicesSection />
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        <AboutMeStats />
        <SafetyEnvironment />
        <GalleryPreview />
      </div>

      <ReviewsCarousel />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <BookingCTA />
      </div>
    </div>
  );
}
