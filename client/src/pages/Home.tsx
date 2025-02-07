import { ArrowRight, Phone, Mail, MapPin, Star, Quote, Heart } from 'lucide-react';
import { Castle, Mountain, Umbrella, PawPrint, Palette, Church } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Home = () => {
  const travelTypes = [
    {
      id: 1,
      name: 'Historic Forts',
      type: 'heritage',
      icon: <Castle className="w-6 h-6 text-blue-600" />,
      description: 'Explore majestic ancient fortifications'
    },
    {
      id: 2,
      name: 'Mountain Treks',
      type: 'adventure',
      icon: <Mountain className="w-6 h-6 text-orange-600" />,
      description: 'Conquer breathtaking peaks'
    },
    {
      id: 3,
      name: 'Sacred Temples',
      type: 'spiritual',
      icon: <Church className="w-6 h-6 text-blue-600" />,
      description: 'Discover spiritual sanctuaries'
    },
    {
      id: 4,
      name: 'Tropical Beaches',
      type: 'leisure',
      icon: <Umbrella className="w-6 h-6 text-orange-600" />,
      description: 'Relax on pristine shores'
    },
    {
      id: 5,
      name: 'Wildlife Safaris',
      type: 'nature',
      icon: <PawPrint className="w-6 h-6 text-blue-600" />,
      description: 'Encounter exotic fauna'
    },
    {
      id: 6,
      name: 'Cultural Hubs',
      type: 'art',
      icon: <Palette className="w-6 h-6 text-orange-600" />,
      description: 'Immerse in local traditions'
    }
  ];

  const featuredDestinations = [
    {
      name: "Maharashtra",
      image: "https://www.holidify.com/images/bgImages/RAJMACHI.jpg",
      description: "Explore the land of kings with its majestic forts and vibrant culture"
    },
    {
      name: "Kerala",
      image: "https://media.assettype.com/TNIE/import/2022/5/2/original/Alleppey.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
      description: "Discover the serene backwaters and lush green landscapes"
    },
    {
      name: "Himachal Pradesh",
      image: "https://www.tripsavvy.com/thmb/TFMyJPWEgRUMjCjVF3knXi2kaa0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1248778184-a6a7af47fb944d919f379793044b4533.jpg",
      description: "Experience the breathtaking Himalayan mountains and adventure sports"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "TravelMate made planning my Kashmir trip effortless. The detailed itineraries and local insights were invaluable!"
    },
    {
      name: "Rahul Verma",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "The best travel planning platform I've used. Their route suggestions for my South India tour were perfect."
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Exceptional service! The interactive map feature helped me plan my Golden Triangle tour efficiently."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="h-[80vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("./images/homeHeroBg.jpg")'
        }}
      >
        <div className="custom-overlay" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Next Adventure</h1>
            <p className="text-xl md:text-2xl mb-8">Explore beautiful destinations around India</p>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Routes Map */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Popular Travel Experiences
          </h2>
          <div className="relative w-full h-[600px] flex items-center justify-center">
            {/* Central Journey Line */}
            <div className="absolute h-[700px] mt-10 w-1 bg-blue-400/50 block"></div>

            {/* Experience Points */}
            <div className="relative w-full h-full">
              {travelTypes.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className="absolute flex items-center gap-4 sm:gap-8  bg-white rounded-xl p-1 md:p-2"
                  style={{
                    left: `${index % 2 === 0 ? '10%' : 'auto'}`,
                    right: `${index % 2 !== 0 ? '10%' : 'auto'}`,
                    top: `${(100 / (travelTypes.length - 1)) * index}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {index % 2 === 0 ? (
                    <div className="flex items-center text-wrap">
                      <div className="text-right sm:text-left">
                        <h3 className="font-semibold text-lg">{experience.name}</h3>
                        <p className="text-gray-600 text-sm">{experience.description}</p>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        {experience.icon}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-wrap">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        {experience.icon}
                      </div>
                      <div className="text-left sm:text-right">
                        <h3 className="font-semibold text-lg">{experience.name}</h3>
                        <p className="text-gray-600 text-sm">{experience.description}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Connecting Lines */}
              {travelTypes.slice(0).map((_, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    className="absolute h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 block"
                    style={{
                      left: isLeft ? '10%' : 'auto',
                      right: !isLeft ? '10%' : 'auto',
                      width: '40%',
                      top: `${(100 / (travelTypes.length - 1)) * index + (50 / (travelTypes.length - 1))}%`,
                      transform: `translateY(-50%) ${isLeft ? 'rotate(-5deg)' : 'rotate(5deg)'}`,
                      transformOrigin: isLeft ? 'right center' : 'left center',
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About TravelMate</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              TravelMate is your ultimate companion for exploring the diverse beauty of India.
              We help travelers discover hidden gems, plan perfect itineraries, and create
              unforgettable memories across this magnificent country.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Route Planning</h3>
              <p className="text-gray-600">Optimized travel routes across India's most beautiful destinations</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
              <p className="text-gray-600">Hand-picked activities and local experiences</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Planning</h3>
              <p className="text-gray-600">Customized itineraries tailored to your preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={index}
                className="relative h-96 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 custom-overlay flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                    <p className="text-gray-200">{destination.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-100" />
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about planning your trip? We're here to help you make
                your travel dreams come true.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span>contact@travelmate.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span>123 Travel Street, Mumbai, India</span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;