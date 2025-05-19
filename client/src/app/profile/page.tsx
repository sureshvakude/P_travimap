'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getSingleUser } from '@/utils/users/api/get-single';
import { getUserTrips } from '@/utils/trips/api/get-user-trip';
import { joinTrip } from '@/utils/trips/api/join-trip';
import { getAllPosts } from '@/utils/posts/api/get-all';
import { Trip } from '@/utils/trips/types/trips';
import { Post } from '@/utils/posts/types/posts';
import { user } from '@/utils/users/types/user-login';
import { updateTrip } from '@/utils/trips/api/update-trip';

const ProfilePage = () => {
    const [user, setUser] = useState<user | null>(null);
    const [userTrips, setUserTrips] = useState<any>(null);
    const [joinedTrips, setJoinedTrips] = useState<any>(null);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<user>>({});
    const [activeTab, setActiveTab] = useState('trips');
    const { data: session } = useSession();
    const id = session?.user?.id;

    useEffect(() => {
        if (id) {
            fetchUserData();
            fetchUserTrips();
            fetchJoinedTrips();
            fetchUserPosts();
        }
    }, [id]);

    const fetchUserData = async () => {
        try {
            const userData = await getSingleUser(String(id));
            setUser(userData);
            setEditData({
                email: userData.email,
                username: userData.username,
                mobile_number: userData.mobile_number,
                address: userData.address,
                gender: userData.gender,
                dob: userData.dob,
            });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const fetchUserTrips = async () => {
        try {
            const trips = await getUserTrips(Number(id));
            setUserTrips(trips);
        } catch (error) {
            console.error('Failed to fetch user trips:', error);
        }
    };

    const fetchJoinedTrips = async () => {
        try {
            const trips = await joinTrip(String(id));
            setJoinedTrips(trips);
        } catch (error) {
            console.error('Failed to fetch joined trips:', error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const posts = await getAllPosts();
            setUserPosts(posts.results || []);
        } catch (error) {
            console.error('Failed to fetch user posts:', error);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateTrip(String(id), editData);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const isUpcomingTrip = (trip: Trip) => {
        const today = new Date();
        const startDate = new Date(trip.start_date);
        return startDate > today;
    };

    const isCompletedTrip = (trip: Trip) => {
        const today = new Date();
        const endDate = new Date(trip.end_date);
        return endDate < today;
    };

    const isCurrentTrip = (trip: Trip) => {
        const today = new Date();
        const startDate = new Date(trip.start_date);
        const endDate = new Date(trip.end_date);
        return today >= startDate && today <= endDate;
    };

    if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-10">
                        <div className="relative">
                            <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow">
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-500 text-4xl">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-sm hover:bg-blue-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editData.email || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={editData.username || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                        <input
                                            type="text"
                                            name="mobile_number"
                                            value={editData.mobile_number || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={editData.address || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select
                                            name="gender"
                                            value={editData.gender || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={editData.dob || ''}
                                            onChange={handleEditChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <p className="text-gray-600">{user.email}</p>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {user.mobile_number && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                                <span>{user.mobile_number}</span>
                                            </div>
                                        )}
                                        {user.address && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{user.address}</span>
                                            </div>
                                        )}
                                        {user.gender && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <span className="capitalize">{user.gender}</span>
                                            </div>
                                        )}
                                        {user.dob && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <span>{new Date(user.dob).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('trips')}
                            className={`${activeTab === 'trips' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            My Trips
                        </button>
                        <button
                            onClick={() => setActiveTab('joined')}
                            className={`${activeTab === 'joined' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Joined Trips
                        </button>
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`${activeTab === 'posts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            My Posts
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {activeTab === 'trips' && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Trips</h2>
                        {userTrips?.results?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userTrips.results.map((trip: Trip) => (
                                    <div key={trip.id} className="bg-white rounded-lg shadow overflow-hidden">
                                        <div className="relative">
                                            {trip.images.length > 0 ? (
                                                <img
                                                    src={trip.images[0].image}
                                                    alt={trip.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                {isUpcomingTrip(trip) && (
                                                    <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Upcoming
                                                    </span>
                                                )}
                                                {isCurrentTrip(trip) && (
                                                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Ongoing
                                                    </span>
                                                )}
                                                {isCompletedTrip(trip) && (
                                                    <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{trip.name}</h3>
                                            <p className="text-gray-600">{trip.destination}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                                                </span>
                                                <span className="text-sm font-semibold">₹{trip.budget}</span>
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                                                    View Details
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <p className="text-gray-500">You haven't created any trips yet.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                    Create New Trip
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'joined' && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Joined Trips</h2>
                        {joinedTrips?.results?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {joinedTrips.results.map((trip: Trip) => (
                                    <div key={trip.id} className="bg-white rounded-lg shadow overflow-hidden">
                                        <div className="relative">
                                            {trip.images.length > 0 ? (
                                                <img
                                                    src={trip.images[0].image}
                                                    alt={trip.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                {isUpcomingTrip(trip) && (
                                                    <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Upcoming
                                                    </span>
                                                )}
                                                {isCurrentTrip(trip) && (
                                                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Ongoing
                                                    </span>
                                                )}
                                                {isCompletedTrip(trip) && (
                                                    <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{trip.name}</h3>
                                            <p className="text-gray-600">By {trip.user}</p>
                                            <p className="text-gray-600">{trip.destination}</p>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                                                </span>
                                                <span className="text-sm font-semibold">₹{trip.budget}</span>
                                            </div>
                                            <div className="mt-4">
                                                <button className="w-full text-blue-500 hover:text-blue-700 text-sm font-medium">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <p className="text-gray-500">You haven't joined any trips yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                Create New Post
                            </button>
                        </div>
                        {userPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userPosts.map((post:any) => (
                                    <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                                        {post.image && (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                                            <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </span>
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-500 hover:text-blue-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                        </svg>
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <p className="text-gray-500">You haven't created any posts yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;