'use client';

import HeroSection from './HeroSection';
import TravelDestinations from './TravelDestinations';
import TravelTypes from './TravelTypes';
import Testimonials from './Testimonials';
import ContactSection from './ContactSection';
import FeaturedDestinations from './FeaturedDestinations';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <TravelDestinations />
        <TravelTypes />
        <FeaturedDestinations />
        <Testimonials />
        <ContactSection />
      </main>
    </div>
  );
};

export default HomePage;