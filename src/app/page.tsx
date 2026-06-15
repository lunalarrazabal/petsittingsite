// This is the Home page — the first thing visitors see.
// It's a recreation of Luna's Rover.com sitter profile.

import ProfileHeader from '@/components/profile/ProfileHeader';
import HeaderPhotoGrid from '@/components/profile/HeaderPhotoGrid';
import ServicesRatesCard from '@/components/profile/ServicesRatesCard';
import HostingCapabilities from '@/components/profile/HostingCapabilities';
import AvailabilityWidget from '@/components/profile/AvailabilityWidget';
import LocationCard from '@/components/profile/LocationCard';
import PetCareExperience from '@/components/profile/PetCareExperience';
import AboutMeStats from '@/components/profile/AboutMeStats';
import SafetyEnvironment from '@/components/profile/SafetyEnvironment';
import SitterPreferences from '@/components/profile/SitterPreferences';
import ReviewsModule from '@/components/profile/ReviewsModule';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <ProfileHeader />
      <HeaderPhotoGrid />
      <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
        <aside className="order-2 space-y-6 lg:order-1 lg:sticky lg:top-24 lg:col-span-1">
          <ServicesRatesCard />
          <HostingCapabilities />
          <AvailabilityWidget />
          <LocationCard />
        </aside>
        <main className="order-1 space-y-10 lg:order-2 lg:col-span-2">
          <PetCareExperience />
          <AboutMeStats />
          <SafetyEnvironment />
          <SitterPreferences />
          <ReviewsModule />
        </main>
      </div>
    </div>
  );
}
