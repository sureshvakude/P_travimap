'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from './HeroSection';
import TravelDestinations from './TravelDestinations';
import TravelTypes from './TravelTypes';
import Testimonials from './Testimonials';
import ContactSection from './ContactSection';
import Footer from '@/components/Footer';
import FeaturedDestinations from './FeaturedDestinations';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} scrolled={scrolled} />
      <main className="flex-grow">
        <HeroSection />
        <TravelDestinations />
        <TravelTypes />
        <FeaturedDestinations/>
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;