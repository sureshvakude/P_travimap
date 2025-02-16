import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../utils/postsFetcher";
import { Heart, MessageCircle } from "lucide-react";
import { getUser } from "../utils/userFetcher";
import Loader from "./Loader";

const ProfilePostExplore = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            const postData = await getPostById(id);
            setPost(postData);
        };
        fetchPost();
    }, [id]);

    const handleNext = () => {
        if (post?.img?.length) {
            setCurrentImage((prev) => (prev + 1) % post.img.length);
        }
    };

    const handlePrev = () => {
        if (post?.img?.length) {
            setCurrentImage((prev) => (prev - 1 + post.img.length) % post.img.length);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!post?.userId) return;
            const user = await getUser(post.userId);
            setUserData(user);
        };
        if (post) fetchUser();
    }, [post]);

    if (!post) {
        return (
            <div className="flex justify-center items-center mx-auto min-h-screen">
                <Loader />
            </div>
        )
    };

    return (
        <div className="p-6 max-w-3xl mx-auto shadow-lg rounded-2xl bg-white">
            {/* User Info */}
            <div className="flex items-center mb-4">
                {userData && (
                    <>
                        <img
                            src={userData?.profilePicture}
                            alt={userData?.username}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <h3 className="text-lg font-bold">{userData?.username}</h3>
                    </>
                )}
            </div>

            {/* Image Carousel */}
            {post.img?.length > 0 && (
                <div className="relative w-full h-96 mb-4">
                    <img
                        src={post.img[currentImage]}
                        alt="Post"
                        className="w-full h-96 object-cover rounded-lg"
                    />
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
            )}

            {/* Post Content */}
            <div className="p-4">
                <p className="text-gray-700 mb-4">{post.caption}</p>

                {/* Like and Comment Section */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Heart className="text-red-500" />
                        <span className="ml-2 font-bold">{post.likes ?? 0}</span>
                    </div>
                    <div className="flex items-center">
                        <MessageCircle className="text-blue-500" />
                        <span className="ml-2 font-bold">{post.comments?.length ?? 0}</span>
                    </div>
                </div>
            </div>
            <button className='w-full py-2 bg-gray-800 text-white cursor-pointer' onClick={()=>navigate(-1)}>Back</button>
        </div>
    );
};

export default ProfilePostExplore;