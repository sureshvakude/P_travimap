import Link from 'next/link';
import { Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Wanderlust
            </h3>
            <p className="text-gray-400 mb-4">
              Your gateway to unforgettable travel experiences around the globe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Popular Destinations</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Adventure Travel</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Luxury Retreats</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Budget Trips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin className="mr-2" size={16} />
                <span>123 Travel St, Wander City</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="mr-2" size={16} />
                <span>hello@wanderlust.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="mr-2" size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}