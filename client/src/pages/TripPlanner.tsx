import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

interface TripDay {
  id: string;
  date: string;
  activities: {
    id: string;
    time: string;
    description: string;
    location: string;
    cost: string;
  }[];
}

const TripPlanner = () => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState<TripDay[]>([]);

  const addDay = () => {
    const newDay: TripDay = {
      id: Math.random().toString(36).substr(2, 9),
      date: '',
      activities: []
    };
    setDays([...days, newDay]);
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
            location: '',
            cost: ''
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

  const updateActivity = (dayId: string, activityId: string, field: string, value: string) => {
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

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log({
      tripName,
      destination,
      startDate,
      endDate,
      days
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-8">Plan Your Trip</h2>
        
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
        </div>

        {/* Itinerary Days */}
        <div className="space-y-6">
          {days.map((day, dayIndex) => (
            <div key={day.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Day {dayIndex + 1}</h3>
                <input
                  type="date"
                  value={day.date}
                  onChange={(e) => {
                    const updatedDays = [...days];
                    updatedDays[dayIndex].date = e.target.value;
                    setDays(updatedDays);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                        type="text"
                        value={activity.location}
                        onChange={(e) => updateActivity(day.id, activity.id, 'location', e.target.value)}
                        placeholder="Location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full md:w-auto">
                      <input
                        type="text"
                        value={activity.cost}
                        onChange={(e) => updateActivity(day.id, activity.id, 'cost', e.target.value)}
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
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;