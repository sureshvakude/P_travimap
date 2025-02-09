import { useEffect, useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/userAuth';
import { addTrip } from '../utils/tripFetcher';
import { deleteImage, uploadImage } from '../utils/uploadImage';
import axios from 'axios';

interface Activity {
  id: string;
  time: string;
  description: string;
  cost: number;
}

interface TripDay {
  id: string;
  day: number;
  activities: Activity[];
}

const TripPlanner = () => {
  const [tripName, setTripName] = useState('');
  const [img, setImg] = useState<any>('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [explorePlaces, setExplorePlaces] = useState<string[]>([]);
  const [type, setType] = useState<'private' | 'public'>('private');
  const [days, setDays] = useState<TripDay[]>([]);
  const [userId, setUserId] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    const tpUser = getUser();
    setUserId(tpUser?._id || null);
  }, []);

  const validateFields = () => {
    if (!tripName || !destination || !startDate || !endDate || !budget || explorePlaces.length === 0) {
      setError('All fields are required.');
      return false;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('Start date must be before end date.');
      return false;
    }

    const tripDuration = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    if (days.length !== 0) {
      if (days[days.length - 1].day > tripDuration) {
        setError(`Number of days should match the trip duration (${tripDuration} days).`);
        return false;
      }
    }

    setError(null);
    return true;
  };

  const addDay = () => {
    const newDay: TripDay = {
      id: Math.random().toString(36).substr(2, 9),
      day: days.length + 1,
      activities: []
    };
    setDays([...days, newDay]);
  };

  const removeDay = (id: string) => {
    setDays(days.filter(day => day.id !== id));
  };

  const addActivity = (dayId: string) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [...day.activities, {
            id: Math.random().toString(36).substr(2, 9),
            time: '',
            description: '',
            cost: 0
          }]
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const removeActivity = (dayId: string, activityId: string) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(activity => activity.id !== activityId)
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const updateActivity = (dayId: string, activityId: string, field: string, value: string | number) => {
    const updatedDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.map(activity => {
            if (activity.id === activityId) {
              return { ...activity, [field]: value };
            }
            return activity;
          })
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const data = await uploadImage(img);
      if (data.status === 200) {
        const tripData = {
          name: tripName,
          img: data.filePath,
          destination,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          budget,
          explorePlaces,
          itinerary: days,
          type,
          userId: userId,
          tripMembers: []
        };

        const response = await addTrip(tripData);
        if (response.status === 201) {
          navigate('/trips');
        } else {
          await deleteImage(data.filePath);
        }
      }
    } catch {
      setError("Failed to Add Trip.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-8">Plan Your Trip</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name
            </label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Summer Vacation 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files && e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paris, France"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explore Places
            </label>
            <input
              type="text"
              value={explorePlaces.join(', ')}
              onChange={(e) => setExplorePlaces(e.target.value.split(', '))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Eiffel Tower, Louvre Museum"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'private' | 'public')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Itinerary Days */}
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Day {day.day}</h3>
                <button
                  onClick={() => removeDay(day.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="flex flex-wrap gap-4 items-start p-4 bg-gray-50 rounded-lg">
                    <div className="w-full md:w-auto">
                      <input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(day.id, activity.id, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={activity.description}
                        onChange={(e) => updateActivity(day.id, activity.id, 'description', e.target.value)}
                        placeholder="Activity description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full md:w-auto">
                      <input
                        type="number"
                        value={activity.cost}
                        onChange={(e) => updateActivity(day.id, activity.id, 'cost', Number(e.target.value))}
                        placeholder="Cost"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => removeActivity(day.id, activity.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addActivity(day.id)}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Activity
              </button>
            </div>
          ))}
        </div>

        {/* Add Day Button */}
        <button
          onClick={addDay}
          className="mt-6 flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Day
        </button>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Itinerary
          </button>
        </div>
      </div>
      <button className='w-full py-2 bg-gray-800 text-white cursor-pointer' onClick={() => navigate("/trips")}>Back</button>
    </div>
  );
};

export default TripPlanner;