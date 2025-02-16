import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../utils/postsFetcher';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const getPosts = await getAllPosts();
      setPosts(getPosts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">Travel Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((photo: any, index: any) => (
          <Link to={`/post/explore/` + photo._id} key={index} className="group relative rounded-lg overflow-hidden cursor-pointer">
            <img
              src={photo.img[0]}
              alt={photo.name}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold text-lg">{photo.name}</p>
              <div className="flex items-center mt-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="ml-2 text-sm">{photo.like}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;