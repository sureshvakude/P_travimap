import { Clock, MapPin, Star, Users } from 'lucide-react';
import { useState } from 'react';

const TripExplore = ({ trip }: { trip: any }) => {
    const [joined, setJoined] = useState(false);

    const handleJoinTrip = () => {
        setJoined(true);
        // Implement API call to join trip here
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <img src={import.meta.env.VITE_API_URL + trip.img} alt={trip.name} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-3xl font-bold mt-4">{trip.name}</h2>
            <p className="text-gray-600 mt-2">{trip.destination}</p>
            <div className="flex items-center mt-2">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </span>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Explore Places</h3>
                <ul className="list-disc pl-6 text-gray-700">
                    {trip.explorePlaces.map((place: any, index: any) => (
                        <div className='flex items-center'>
                            <MapPin className='h-4 w-4 text-gray-400 mr-2' />
                            <span key={index}>{place}</span>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Itinerary</h3>
                {trip.itinerary.map((dayPlan: any) => (
                    <div key={dayPlan.day} className="mt-2 p-4 border rounded-lg">
                        <h4 className="font-semibold">Day {dayPlan.day}</h4>
                        {dayPlan.activities.map((activity: any, idx: any) => (
                            <div key={idx} className="text-gray-700 mt-1">
                                <span className="font-medium">{activity.time}:</span> {activity.description} (₹{activity.cost})
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{trip.type}</span>
                </div>
                <button
                    onClick={handleJoinTrip}
                    className={`px-6 py-2 rounded-lg transition-colors ${joined ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                    disabled={joined}
                >
                    {joined ? 'Joined' : 'Join Trip'}
                </button>
            </div>
        </div>
    );
};

export default TripExplore;