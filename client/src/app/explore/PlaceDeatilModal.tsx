// components/explore/PlaceDetailsModal.tsx
import { useState } from 'react';
import Image from 'next/image';
import { Place } from '@/utils/explore/type/place';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PlaceDetailsModalProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetailsModal = ({ place, onClose }: PlaceDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === place.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? place.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="relative h-64 md:h-96">
          {place.images.length > 0 ? (
            <>
              <Image
                src={place.images[currentImageIndex].image}
                alt={`${place.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
              {place.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {place.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-700">
              {place.rating?.toFixed(1) || 'N/A'}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-700">{place.likes} likes</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">{place.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">
                {place.nearby_city}, {place.state}
              </p>
              <p className="text-gray-600 mt-1">
                {place.distance_from_nearby_city} from {place.nearby_city}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {place.category}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {place.region}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Best time: {place.best_time_to_visit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsModal;