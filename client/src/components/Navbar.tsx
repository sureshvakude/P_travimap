'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            TravelMap
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/explore" className="text-gray-700 hover:text-indigo-600 transition">
            Explore
          </Link>
          <Link href="/trips" className="text-gray-700 hover:text-indigo-600 transition">
            Trips
          </Link>
          <Link href="/gallery" className="text-gray-700 hover:text-indigo-600 transition">
            Gallery
          </Link>
        </nav>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <span className="font-medium">{session.user?.email?.toString().at(0)}</span>
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-2 px-4">
          <nav className="flex flex-col space-y-3">
            <Link href="/explore" className="text-gray-700 hover:text-indigo-600 transition py-2">
              Explore
            </Link>
            <Link href="/trips" className="text-gray-700 hover:text-indigo-600 transition py-2">
              Trips
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-indigo-600 transition py-2">
              Gallery
            </Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-200">
            {!isLoggedIn ? (
              <div className="flex flex-col space-y-3">
                <Link href="/signin" className="text-gray-700 hover:text-indigo-600 transition py-2">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link href="/profile" className="text-gray-700 hover:text-indigo-600 transition py-2">
                  Profile
                </Link>
                <button onClick={() => signOut()} className="text-left text-gray-700 hover:text-indigo-600 transition py-2">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;