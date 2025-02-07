const Post = require('../models/Post');

// Create New Post
const addPost = async (req, res) => {
    const { userId, name, img, caption, like, comments } = req.body;

    try {
        const newPost = await Post.create({ userId, name, img, caption, like, comments });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to Add Post", error: error.message });
    }
}

// Get All Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve posts", error: error.message });
    }
}

// Get Single Post
const getPostById = async (req, res) => {
    const { _id } = req.params;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const post = await Post.findById(_id).lean();
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve post", error: error.message });
    }
}

// Update a post
const updatePost = async (req, res) => {
    const { _id } = req.params;
    const { userId, name, img, caption, like, comments } = req.body;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            _id,
            { userId, name, img, caption, like, comments },
            { new: true }
        ).lean();
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Unable to update post", error: error.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    const { _id } = req.params;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(_id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete post", error: error.message });
    }
};

const getPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).lean();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve posts", error: error.message });
    }
}

module.exports = { addPost, getAllPosts, getPostById, updatePost, deletePost, getPostsByUserId };