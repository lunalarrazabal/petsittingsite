import ProfileHeader from '@/components/profile/ProfileHeader';
import TrustBadges from '@/components/profile/TrustBadges';
import HomeServicesSection from '@/components/profile/HomeServicesSection';
import PetCareExperience from '@/components/profile/PetCareExperience';
import AboutMeStats from '@/components/profile/AboutMeStats';
import SafetyEnvironment from '@/components/profile/SafetyEnvironment';
import GalleryPreview from '@/components/profile/GalleryPreview';
import ReviewsCarousel from '@/components/profile/ReviewsCarousel';
import BookingCTA from '@/components/profile/BookingCTA';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:pt-12">
      {/* Hero */}
      <ProfileHeader />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Main content — generous vertical rhythm */}
      <div className="mt-20 space-y-20">
        {/* Services */}
        <HomeServicesSection />

        {/* Pet Care Experience */}
        <PetCareExperience />

        {/* About Me */}
        <AboutMeStats />

        {/* Safety, Trust & Environment */}
        <SafetyEnvironment />

        {/* Gallery preview */}
        <GalleryPreview />

        {/* Reviews */}
        <ReviewsCarousel />

        {/* Booking CTA */}
        <BookingCTA />
      </div>
    </div>
  );
}
