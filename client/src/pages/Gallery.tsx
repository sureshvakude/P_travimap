import { Heart } from 'lucide-react';

const Gallery = () => {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Maldives',
      likes: 2453
    },
    {
      url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Venice, Italy',
      likes: 1832
    },
    {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Swiss Alps',
      likes: 3201
    },
    {
      url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Santorini, Greece',
      likes: 2789
    },
    {
      url: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Bali, Indonesia',
      likes: 1943
    },
    {
      url: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      location: 'Iceland',
      likes: 2156
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">Travel Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div key={index} className="group relative rounded-lg overflow-hidden">
            <img
              src={photo.url}
              alt={photo.location}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold text-lg">{photo.location}</p>
              <div className="flex items-center mt-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="ml-2 text-sm">{photo.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;