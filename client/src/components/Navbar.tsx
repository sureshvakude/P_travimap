import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, Image, User, LogIn, Menu, X, Calendar } from 'lucide-react';
import useAuth from '../hooks/userAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src='./icons/logo.png' alt='logo' className='w-10 h-10' />
              <span className="text-xl font-bold text-gray-900">{import.meta.env.VITE_APP_NAME || `Travimap`}</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Compass className="h-5 w-5" />
              <span>Explore</span>
            </Link>
            <Link to="/routes" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Map className="h-5 w-5" />
              <span>Routes</span>
            </Link>
            <Link to="/planner" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Calendar className="h-5 w-5" />
              <span>Trip Planner</span>
            </Link>
            <Link to="/gallery" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Image className="h-5 w-5" />
              <span>Gallery</span>
            </Link>
            {
              user ? (
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/explore" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Compass className="h-5 w-5" />
                <span>Explore</span>
              </Link>
              <Link to="/routes" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Map className="h-5 w-5" />
                <span>Routes</span>
              </Link>
              <Link to="/planner" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Calendar className="h-5 w-5" />
                <span>Trip Planner</span>
              </Link>
              <Link to="/gallery" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                <Image className="h-5 w-5" />
                <span>Gallery</span>
              </Link>
              {
                user ? (
                  <Link to="/profile" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                ) : (
                  <Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )
              }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;