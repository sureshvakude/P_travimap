import { Settings, MapPin, Calendar, Camera } from 'lucide-react';

const Profile = () => {
  const user = {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    joinedDate: 'January 2024',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    trips: [
      {
        destination: 'Paris, France',
        date: 'March 2024',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        destination: 'Tokyo, Japan',
        date: 'May 2024',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="absolute -bottom-16 left-8">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{user.location}</span>
                <Calendar className="h-4 w-4 ml-4 mr-1" />
                <span className="text-sm">Joined {user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Trips */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Upcoming Trips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.trips.map((trip, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                    <p className="text-sm text-gray-600">{trip.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Travel Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 group-hover:bg-opacity-20 transition-opacity rounde d-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;