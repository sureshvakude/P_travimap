import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';

//components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Footer from './components/Footer';
import TripPlanner from './pages/TripPlanner';
import TravelRoutes from './pages/Routes';
import Gallery from './pages/Gallery';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <RouterRoutes>
          <Route path='/' element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/routes" element={<TravelRoutes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/planner" element={<TripPlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Route */}
        </RouterRoutes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App