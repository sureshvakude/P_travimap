'use client';

import { useState, useEffect } from 'react';
import { getAllPosts } from '@/utils/posts/api/get-all-posts';
import { Post, PostsResponse } from '@/utils/posts/types/posts';
import { getPostById } from '@/utils/posts/api/get-post';
import { HeartIcon, ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const PostsGallery = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data.results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load posts');
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
            setIsModalOpen(true);
        } catch (err) {
            console.error('Error fetching post details:', err);
        }
    };

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter(id => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-10 text-red-500">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mt-10">
                Community Gallery
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div
                            className="relative cursor-pointer"
                            onClick={() => handlePostClick(post.id)}
                        >
                            {post.images.length > 0 && (
                                <img
                                    src={post.images[0].image}
                                    alt={post.caption}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                <div className="flex space-x-4 text-white">
                                    <span className="flex items-center">
                                        <HeartIconSolid className="h-5 w-5 mr-1" />
                                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                                    </span>
                                    <span className="flex items-center">
                                        <ChatBubbleOvalLeftIcon className="h-5 w-5 mr-1" />
                                        {post.comments.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 truncate">{post.name}</h3>
                            <p className="text-gray-600 text-sm truncate">{post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for full post view */}
            {isModalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>

                            <div className="md:flex">
                                <div className="md:w-2/3">
                                    {selectedPost.images.length > 0 && (
                                        <img
                                            src={selectedPost.images[0].image}
                                            alt={selectedPost.caption}
                                            className="w-full h-auto max-h-[70vh] object-contain"
                                        />
                                    )}
                                </div>

                                <div className="md:w-1/3 p-4">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                                            <span className="text-lg font-semibold">
                                                {selectedPost.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="font-bold">{selectedPost.name}</h3>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-800">{selectedPost.caption}</p>
                                        <p className="text-gray-500 text-sm mt-2">
                                            {new Date(selectedPost.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="border-t border-b border-gray-200 py-4 mb-4">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <button
                                                onClick={() => toggleLike(selectedPost.id)}
                                                className="flex items-center"
                                            >
                                                {likedPosts.includes(selectedPost.id) ? (
                                                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                                                ) : (
                                                    <HeartIcon className="h-6 w-6" />
                                                )}
                                                <span className="ml-1">
                                                    {selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)}
                                                </span>
                                            </button>
                                            <div className="flex items-center">
                                                <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                                                <span className="ml-1">{selectedPost.comments.length}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="comments-section">
                                        <h4 className="font-semibold mb-2">Comments</h4>
                                        {selectedPost.comments.length > 0 ? (
                                            <div className="space-y-3">
                                                {selectedPost.comments.map(comment => (
                                                    <div key={comment.id} className="flex items-start">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                                            <span className="text-xs font-semibold">
                                                                {comment.user.toString().charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">User {comment.user}</p>
                                                            <p className="text-sm">{comment.message}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(comment.created_at).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm">No comments yet.</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <textarea
                                            placeholder="Add a comment..."
                                            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows={2}
                                        />
                                        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
                                            Post
                                        </button>
                                    </div>
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