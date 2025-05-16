'use client';

import { useState, useEffect } from 'react';
import { getAllPosts } from '@/utils/posts/api/get-all-posts';
import { Post } from '@/utils/posts/types/posts';
import { getPostById } from '@/utils/posts/api/get-post';
import { HeartIcon, ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const PostsGallery = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                const now = new Date();
                const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

                // Enhanced sorting logic
                const sortedPosts = data.results.sort((a, b) => {
                    const aDate = new Date(a.created_at);
                    const bDate = new Date(b.created_at);

                    // Priority 1: Followed users' recent posts
                    const aIsFollowedRecent = a.user === 2 && aDate > twentyFourHoursAgo;
                    const bIsFollowedRecent = b.user === 2 && bDate > twentyFourHoursAgo;

                    if (aIsFollowedRecent && !bIsFollowedRecent) return -1;
                    if (!aIsFollowedRecent && bIsFollowedRecent) return 1;

                    // Priority 2: All recent posts
                    const aIsRecent = aDate > twentyFourHoursAgo;
                    const bIsRecent = bDate > twentyFourHoursAgo;

                    if (aIsRecent && !bIsRecent) return -1;
                    if (!aIsRecent && bIsRecent) return 1;

                    // Priority 3: Followed users' older posts
                    if (a.user === 2 && b.user !== 2) return -1;
                    if (a.user !== 2 && b.user === 2) return 1;

                    // Finally sort by date
                    return bDate.getTime() - aDate.getTime();
                });

                setPosts(sortedPosts);
            } catch (err) {
                console.error('Failed to load posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostClick = async (postId: number) => {
        try {
            const post = await getPostById(postId.toString());
            setSelectedPost(post);
            setCurrentImageIndex(0);
            setIsModalOpen(true);
        } catch {
            console.error('Error fetching post details');
        }
    };

    const toggleLike = (postId: number) => {
        setLikedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4"></div>
                <p className="text-gray-600">Loading community posts...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent text-center mt-12">
                        {posts.some(post => new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000))
                            ? "Recent Posts"
                            : "Community Gallery"}
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Posts Grid with Enhanced Visual Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {posts.map((post) => {
                        const isRecent = new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000);
                        const isFollowedUser = post.user === 2; // Example: user 2 is followed

                        return (
                            <div
                                key={post.id}
                                className={`relative group cursor-pointer ${isRecent ? 'ring-2 ring-purple-500' : ''} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg`}
                                onClick={() => handlePostClick(post.id)}
                            >
                                {/* Post Image */}
                                <div className="aspect-square relative bg-gray-100">
                                    {post.images.length > 0 && (
                                        <Image
                                            src={post.images[0].image}
                                            alt={post.caption}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                        />
                                    )}
                                    {/* Interaction Overlay */}
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                                        <span className="flex items-center">
                                            <HeartIconSolid className="h-4 w-4 mr-1" />
                                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                                        </span>
                                        <span className="flex items-center">
                                            <ChatBubbleOvalLeftIcon className="h-4 w-4 mr-1" />
                                            {post.comments.length}
                                        </span>
                                    </div>
                                </div>

                                {/* User/Caption Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 flex items-center justify-center">
                                            <span className="text-xs font-medium">
                                                {post.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-white text-sm truncate">{post.caption}</p>
                                    </div>
                                </div>

                                {/* Followed User Badge */}
                                {isFollowedUser && (
                                    <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                        <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                                        Following
                                    </div>
                                )}

                                {/* Recent Post Indicator */}
                                {isRecent && (
                                    <div className="absolute top-2 right-2 bg-white text-purple-500 text-xs px-2 py-1 rounded-full">
                                        New
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Enhanced Post Modal */}
            {isModalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 z-50 text-white md:text-gray-800 p-1.5 rounded-full bg-black/50 md:bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>

                        {/* Image Carousel - Fixed Aspect Ratio */}
                        <div className="w-full md:w-[65%] h-[60vh] md:h-full bg-black flex items-center justify-center relative">
                            {selectedPost.images.length > 0 ? (
                                selectedPost.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-300 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <Image
                                            src={image.image}
                                            alt={selectedPost.caption}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                        />
                                    </div>
                                ))
                            ):
                            (
                                <Image
                                    src={selectedPost.images[currentImageIndex].image}
                                    alt={selectedPost.caption}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            )}
                        </div>

                        {/* Right Side Content - Improved Layout */}
                        <div className="w-full md:w-[35%] h-[40vh] md:h-full flex flex-col border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden">
                            {/* User Header */}
                            <div className="p-4 border-b flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                    <span className="font-medium">
                                        {selectedPost.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-semibold truncate">{selectedPost.name}</h3>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(selectedPost.created_at).toLocaleString()}
                                    </p>
                                </div>
                                {selectedPost.user === 2 && (
                                    <span className="ml-auto text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                        Following
                                    </span>
                                )}
                            </div>

                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Caption */}
                                <div className="p-4 border-b">
                                    <p className="text-gray-800 whitespace-pre-line">{selectedPost.caption}</p>
                                </div>

                                {/* Comments */}
                                <div className="p-4 space-y-4">
                                    {selectedPost.comments.length > 0 ? (
                                        selectedPost.comments.map(comment => (
                                            <div key={comment.id} className="flex space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                                    <span className="text-xs font-medium">
                                                        {comment.user.toString().charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-baseline space-x-2">
                                                        <span className="font-medium text-sm">User {comment.user}</span>
                                                        <span className="text-gray-500 text-xs">
                                                            {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm mt-1 whitespace-pre-line">{comment.message}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            No comments yet
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="p-4 border-t bg-white">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => toggleLike(selectedPost.id)}
                                            className="p-1"
                                        >
                                            {likedPosts.includes(selectedPost.id) ? (
                                                <HeartIconSolid className="h-6 w-6 text-red-500" />
                                            ) : (
                                                <HeartIcon className="h-6 w-6" />
                                            )}
                                        </button>
                                        <button className="p-1">
                                            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)} likes
                                    </p>
                                </div>

                                {/* Comment Input */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="flex-1 text-sm border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                    <button className="text-purple-500 font-semibold text-sm px-2">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsGallery;