import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

const Explore = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const destinations = [
    {
      name: 'Paris, France',
      description: 'The City of Light featuring iconic landmarks and rich culture',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      price: '€200/night',
      category: 'city'
    },
    {
      name: 'Tokyo, Japan',
      description: 'A fascinating blend of traditional culture and modern technology',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      price: '¥25000/night',
      category: 'mountain'
    },
    {
      name: 'New York, USA',
      description: 'The city that never sleeps with endless entertainment options',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      price: '$250/night',
      category: 'beach'
    }
  ];

  const filteredDestinations = destinations.filter(destination =>
    (categoryFilter === 'all' || destination.category === categoryFilter) &&
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-3 border rounded-lg"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {destinations.map((destination, index) => (
              <option value={destination.category} key={index}>{destination.category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <span className="text-sm font-medium text-blue-600">{destination.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">View on map</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                  <span className="ml-1 text-yellow-400">★</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;