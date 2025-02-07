import { Search, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllPlaces } from '../utils/exploreFetcher';

const Explore = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<any>([]);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const getDestinations = await getAllPlaces();
      setDestinations(getDestinations);
    }

    fetchAllPlaces();
  }, []);

  const filteredDestinations = destinations.filter((destination: { category: string; name: string; }) =>
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
            {destinations.map((destination: { category: any }, index: any) => (
              <option value={destination.category} key={index}>{destination.category}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredDestinations.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/template-3/no-order.png" // Add an appropriate image in the public folder
            alt="No Places Available"
            className="w-60 h-60 object-contain"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">No Places Found</h2>
          <p className="text-gray-500 text-sm mt-2">Try searching with a different filter or check back later.</p>
        </div>
      )}

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((destination: any, index: any) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={destination.img}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <span className="text-sm font-medium text-blue-600">{destination.category}</span>
              </div>
              <p className="text-gray-600 mb-4">{destination.description.slice(0, 100)}...</p>
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