import { Clock, MapPin, Star } from 'lucide-react';

const Routes = () => {
  const routes = [
    {
      title: 'European Classics',
      duration: '14 days',
      destinations: ['Paris', 'Rome', 'Barcelona'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: '€2,999'
    },
    {
      title: 'Southeast Asia Adventure',
      duration: '12 days',
      destinations: ['Bangkok', 'Singapore', 'Bali'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: '$2,499'
    },
    {
      title: 'American Road Trip',
      duration: '10 days',
      destinations: ['New York', 'Miami', 'Las Vegas'],
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: '$1,999'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Travel Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.map((route, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={route.image}
                alt={route.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                {route.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{route.title}</h3>
              <div className="flex items-center mb-4">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{route.duration}</span>
              </div>
              <div className="space-y-2 mb-4">
                {route.destinations.map((destination, idx) => (
                  <div key={idx} className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{destination}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{route.rating}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routes;