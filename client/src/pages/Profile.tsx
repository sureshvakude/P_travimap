import { Settings, MapPin, Calendar, Camera, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/userAuth';
import { getUserPosts } from '../utils/postsFetcher';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>([]);
  const [trips, setTrips] = useState<any>([]);

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  useEffect(() => {
    const fetchePosts = async () => {
      if (user) {
        const getPosts = await getUserPosts(user._id);
        setPosts(getPosts.data);
      }
    }
    fetchePosts();
  }, [user]);

  const handleSignout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div
          className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500"
          style={{
            backgroundImage: `url(${user?.profileBackground || "https://www.holidify.com/images/bgImages/MUNNAR.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <img
              src={user?.profilePicture || "/images/default.png"}
              alt={user?.username || "User"}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>

          {/* Settings Button */}
          <div ref={dropdownRef} className="absolute top-4 right-4">
            <button
              className="p-2 bg-white rounded-full shadow-md cursor-pointer"
              onClick={() => setIsSettingOpen(!isSettingOpen)}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isSettingOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                <button onClick={handleSignout} className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 cursor-pointer text-center ml-2">
                  <LogOut className='h-5 w-5' />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{user?.address}</span>
                <Calendar className="h-4 w-4 ml-4 mr-1" />
                <span className="text-sm">Joined {user?.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Trips */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Upcoming Trips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.length === 0 && (
                <div>
                  <img src='/images/noUpcomingPlan.png' alt='no trip plan' className='w-36 h-36' />
                </div>
              )}
              {/* {user?.trips.map((trip: any, index: any) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                  <img
                    src={trip?.image}
                    alt={trip?.destination}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{trip?.destination}</h4>
                    <p className="text-sm text-gray-600">{trip?.date}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Travel Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {posts.length === 0 && (
                <div>
                  <img src='/images/noPost.png' alt='no trip plan' className='w-36 h-36' />
                </div>
              )}
              {posts?.map((post: any, index: any) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-gray-400" />
                    <img src={import.meta.env.VITE_API_URL + post.img[0]} alt={`posts` + index} className='w-full h-full' />
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