import { Clock, MapPin, PlusCircle, Route, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllTrips } from '../utils/tripFetcher';
import TripExplore from '../components/tripExplore';
import { Link } from 'react-router-dom';

const Routes = () => {
  const [trips, SetTrips] = useState<any>(null);
  const [selectedTrip, SetSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const getTrips = await getAllTrips();
        SetTrips(getTrips.data);
        console.log(getTrips);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrips();
  }, []);

  if (selectedTrip) {
    return (
      <>
        <TripExplore trip={selectedTrip} />
        <button className='w-full py-2 bg-gray-800 text-white cursor-pointer' onClick={() => SetSelectedTrip(null)}>Back</button>
      </>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Upcoming Trips</h2>
        <Link className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer" to="/trip-plan">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Trip Plan
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips && trips?.map((trip: any, index: any) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={import.meta.env.VITE_API_URL + trip.img}
                alt={trip.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                ₹{trip.budget}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
              <div className="flex items-center mb-4">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
              <div className='flex items-center mb-4'>
                <Route className='h-4 w-4 text-gray-400 mr-2' />
                <span>{trip.destination}</span>
              </div>
              <div className="space-y-2 mb-4">
                {trip.explorePlaces.map((destination: any, idx: any) => (
                  <div key={idx} className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{destination}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{trip.tripMembers.length} joined</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={() => SetSelectedTrip(trip)}>
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