import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                    <img src='./icons/logo-round.png' alt='logo' className='w-10 h-10' />
                        <span className="text-xl font-bold">{import.meta.env.VITE_APP_NAME || `Travimap`}</span>
                    </div>
                    <p className="text-gray-400">
                        Your trusted companion for exploring the wonders of India.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/explore" className="text-gray-400 hover:text-white">Explore</Link></li>
                        <li><Link to="/routes" className="text-gray-400 hover:text-white">Routes</Link></li>
                        <li><Link to="/gallery" className="text-gray-400 hover:text-white">Gallery</Link></li>
                        <li><Link to="/planner" className="text-gray-400 hover:text-white">Trip Planner</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">Rajasthan</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Kerala</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Himachal Pradesh</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Goa</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Youtube className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 TravelMate. All rights reserved.</p>
                <p>made by <Link to='#'>codeinshort.in</Link></p>
            </div>
        </div>
    </footer>
    )
}

export default Footer;