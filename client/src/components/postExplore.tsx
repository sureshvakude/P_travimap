import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { getUser } from "../utils/userFetcher";

const postExplore = ({ post }: { post: any }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [userData, SetUserData] = useState<any>(null);
    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % post.img.length);
    };

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + post.img.length) % post.img.length);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(post.userId);
            SetUserData(user);
        }
        fetchUser();
    }, [post.userId]);

    return (
        <div className="p-6 max-w-3xl mx-auto shadow-lg rounded-2xl bg-white">
            {/* User Info */}
            <div className="flex items-center mb-4">
                <img src={userData?.profilePicture} alt={userData?.username} className="w-10 h-10 rounded-full mr-3" />
                <h3 className="text-lg font-bold">{userData?.username}</h3>
            </div>

            {/* Image Carousel */}
            <div className="relative w-full h-96 mb-4">
                <img src={import.meta.env.VITE_API_URL+post.img[currentImage]} alt="Post" className="w-full h-96 object-cover rounded-lg" />
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                >
                    ▶
                </button>
            </div>

            {/* Post Content */}
            <div className="p-4">
                <p className="text-gray-700 mb-4">{post.caption}</p>

                {/* Like and Comment Section */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Heart className="text-red-500" />
                        <span className="ml-2 font-bold">{post.like}</span>
                    </div>
                    <div className="flex items-center">
                        <MessageCircle className="text-blue-500" />
                        <span className="ml-2 font-bold">{post?.comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default postExplore
