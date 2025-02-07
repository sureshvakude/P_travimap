const express = require('express');
const router = express.Router();
const { addPost, getAllPosts, getPostById, getPostsByUserId, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getAllPosts); // Get All Posts
router.get('/:_id', getPostById); // Get Single Post
router.get('/user/posts/:userId', getPostsByUserId); // Get Posts by UserId
router.post('/', addPost); // Add Post
router.put('/:_id', updatePost); // Update Post
router.delete('/:_id', deletePost); // Delete Post

module.exports = router;