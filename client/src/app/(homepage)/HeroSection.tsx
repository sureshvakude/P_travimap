// components/home/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />
      <img
        src="/images/home/home.jpg"
        alt="Travel Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Next Adventure</h1>
        <p className="text-xl md:text-2xl mb-8">
          Explore the world's most beautiful places with TravelMap. Find your perfect trip and create
          memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/explore"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition"
          >
            Explore Destinations
          </Link>
          <Link
            href="/trips"
            className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            Plan a Trip
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;