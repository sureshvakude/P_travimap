const express = require('express');
const router = express.Router();
const {signupUser, signinUser, getUserById, getAllUsers, updateUser, deleteUser} = require('../controllers/userController');

router.get('/', getAllUsers); // Get All Users
router.get('/:_id', getUserById); // Get Single User
router.post('/', signupUser); // Signup User
router.post('/login', signinUser); // Login User
router.put('/:_id', updateUser); // Update User
router.delete('/:_id', deleteUser); // Delete User

module.exports = router;