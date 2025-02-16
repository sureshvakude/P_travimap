import { BrowserRouter as Router, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

//components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Footer from './components/Footer';
import TripPlanner from './components/TripPlanner';
import TravelRoutes from './pages/Trips';
import Gallery from './pages/Gallery';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import useAuth from './contexts/userAuth';
import ProfilePostExplore from './components/PostExplore';
import PlaceExploreNew from './components/placeExplore';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <RouterRoutes>
          <Route path='/' element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trips" element={<TravelRoutes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/explore/:id" element={<ProfilePostExplore />} />
          <Route path="/place/explore/:id" element={<PlaceExploreNew />} />
          {/* Protected Routes */}
          <Route path="/trip-plan" element={<PrivateRoute element={<TripPlanner />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Route */}
        </RouterRoutes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

// Private Route Component
const PrivateRoute = ({ element }: { element: any }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? element : <Navigate to="/" replace />;
};