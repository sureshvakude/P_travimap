"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on your auth state
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className={isScrolled ? 'text-gray-800' : 'text-white'}>TravelEase</span>
          </Link>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex space-x-8">
          <Link 
            href="/explore" 
            className={`transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} ${pathname === '/explore' ? (isScrolled ? 'text-blue-600' : 'text-blue-200') : ''}`}
          >
            Explore
          </Link>
          <Link 
            href="/trips" 
            className={`transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} ${pathname === '/trips' ? (isScrolled ? 'text-blue-600' : 'text-blue-200') : ''}`}
          >
            Trips
          </Link>
          <Link 
            href="/gallery" 
            className={`transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'} ${pathname === '/gallery' ? (isScrolled ? 'text-blue-600' : 'text-blue-200') : ''}`}
          >
            Gallery
          </Link>
        </div>

        {/* Auth Buttons - Right */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button className={`rounded-full w-10 h-10 flex items-center justify-center ${isScrolled ? 'bg-gray-200' : 'bg-white bg-opacity-20'}`}>
                <span className="text-lg">👤</span>
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className={`px-4 py-2 rounded-md ${isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;