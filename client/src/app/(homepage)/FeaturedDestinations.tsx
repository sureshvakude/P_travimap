"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
    rating: 4.8,
    travelers: 1243,
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800',
    rating: 4.9,
    travelers: 892,
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=800',
    rating: 4.7,
    travelers: 1567,
  },
  {
    id: 4,
    name: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800',
    rating: 4.9,
    travelers: 721,
  },
  {
    id: 5,
    name: 'Patagonia, Chile',
    image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=800',
    rating: 4.6,
    travelers: 543,
  },
];

export default function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most breathtaking places loved by travelers worldwide
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors -ml-4"
          >
            <ArrowLeft className="text-gray-800" />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {destinations.map((destination) => (
                <div key={destination.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 flex-shrink-0">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-gray-700">{destination.rating}</span>
                        </div>
                        <div className="text-gray-500">
                          {destination.travelers.toLocaleString()} travelers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors -mr-4"
          >
            <ArrowRight className="text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}