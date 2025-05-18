'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getAllTrips } from '@/utils/trips/api/get-all-trips';
import { updateTrip } from '@/utils/trips/api/update-trip';
import { Trip, TripApiResponse } from '@/utils/trips/types/trips';
declare module 'next-auth' {
  interface Session {
    user?: {
      id?: number;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
  }
}

const TripsPage = () => {
  const { data: session } = useSession();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const allTripData = await getAllTrips();
        setTrips(allTripData.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleJoinTrip = async (tripId: number) => {
    if (!session?.user?.id) return;
    try {
      const tripToUpdate = trips.find(trip => trip.id === tripId);
      if (!tripToUpdate) return;
      const updatedMembers = [...tripToUpdate.trip_members, Number(session.user.id)];
      const updatedTrip = await updateTrip(tripId.toString(), {
        trip_members: updatedMembers
      } as Partial<Trip>);
      if (updatedTrip) {
        setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
        if (selectedTrip?.id === updatedTrip.id) {
          setSelectedTrip(updatedTrip);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join trip');
    }
  };

  const isTripMember = (trip: Trip) => {
    return !!(session?.user?.id && trip.trip_members.includes(Number(session.user.id)));
  };

  const canViewPrivateTrip = (trip: Trip) => {
    if (trip.trip_type === 'public') return true;
    if (!session?.user?.id) return false;
    return Number(trip.user) === Number(session.user.id) || isTripMember(trip);
  };

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'public') {
      return trip.trip_type === 'public';
    } else {
      return trip.trip_type === 'private' && canViewPrivateTrip(trip);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mt-10">
            Explore Amazing Trips
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join exciting adventures or create your own
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'public'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Public Trips
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'private'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Private Trips
            </button>
          </div>
        </div>

        {selectedTrip ? (
          <TripDetail
            trip={selectedTrip}
            onBack={() => setSelectedTrip(null)}
            isMember={isTripMember(selectedTrip)}
            onJoin={() => handleJoinTrip(selectedTrip.id)}
            userId={session?.user?.id}
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => setSelectedTrip(trip)}
                  isMember={isTripMember(trip)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">
                  No {activeTab} trips available
                </h3>
                <p className="mt-2 text-gray-500">
                  {activeTab === 'public'
                    ? 'Check back later for public trips'
                    : session?.user?.id
                      ? 'You have no private trips'
                      : 'Sign in to view private trips'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TripCard = ({
  trip,
  onClick,
  isMember
}: {
  trip: Trip;
  onClick: () => void;
  isMember: boolean
}) => {
  const startDate = new Date(trip.start_date).toLocaleDateString();
  const endDate = new Date(trip.end_date).toLocaleDateString();

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      {trip.images.length > 0 && (
        <div className="h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={trip.images[0].image}
            alt={trip.name}
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">{trip.name}</h2>
          <span className={`px-2 py-1 text-xs rounded-full ${trip.trip_type === 'public'
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
            }`}>
            {trip.trip_type}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{trip.destination}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>
            {startDate} - {endDate}
          </span>
          <span className="mx-2">•</span>
          <span>₹{trip.budget}</span>
        </div>
        {isMember && (
          <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            Joined
          </span>
        )}
      </div>
    </div>
  );
};

const TripDetail = ({
  trip,
  onBack,
  isMember,
  onJoin,
  userId
}: {
  trip: Trip;
  onBack: () => void;
  isMember: boolean;
  onJoin: () => void;
  userId?: number;
}) => {
  const startDate = new Date(trip.start_date).toLocaleDateString();
  const endDate = new Date(trip.end_date).toLocaleDateString();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to trips
      </button>

      <div className="relative">
        {trip.images.length > 0 && (
          <div className="h-64 md:h-80 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={trip.images[0].image}
              alt={trip.name}
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">{trip.name}</h1>
          <p className="text-gray-200 mt-1">{trip.destination}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <span className="text-gray-700">
              <span className="font-semibold">Dates:</span> {startDate} - {endDate}
            </span>
            <span className="mx-4 text-gray-400">|</span>
            <span className="text-gray-700">
              <span className="font-semibold">Budget:</span> ₹{trip.budget}
            </span>
          </div>

          {Number(trip.user) !== Number(userId) && (
            <button
              onClick={onJoin}
              disabled={isMember}
              className={`px-4 py-2 rounded-md font-medium ${isMember
                  ? 'bg-gray-200 text-gray-700 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {isMember ? 'Already Joined' : 'Join Trip'}
            </button>
          )}
        </div>

        {trip?.description && (
          <div className='mb-8 text-gray-700'>
            <span className='text-black font-bold'>Note: </span>
            <span>{trip.description}</span>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Places to Explore</h2>
          <p className="text-gray-700">{trip.explore_places}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
          <div className="space-y-4">
            {trip.itinerary.map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900">Day {item.day}</h3>
                <p className="text-gray-700 mt-1">{item.activities}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;