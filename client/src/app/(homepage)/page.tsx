import Navbar from '@/components/Navbar';
import FeaturedDestinations from './FeaturedDestinations';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section with Navbar */}
      <div className="relative h-screen w-full overflow-hidden">
        <Navbar />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1685&q=80"
            alt="Beautiful travel destination"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-medium">
              Explore Destinations
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-300 text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Footer */}
      <Footer />
    </div>
  );
}