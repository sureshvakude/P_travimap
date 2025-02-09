const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create New User
const signupUser = async (req, res) => {
    const { username, email, password, mobileNumber, gender, DOB, role, profilePicture, profileBackground,address } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await User.create({ username, email, password, mobileNumber, gender, DOB, role, profilePicture, profileBackground, address });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to create account.', error: error.message });
    }
}

// Login User
const signinUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.isActive) {
            return res.status(400).json({ message: 'Invalid credentials or account is inactive' });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user: user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to login.', error: error.message });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    const { _id } = req.params;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isActive = false;
        await user.save();

        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to delete account.', error: error.message });
    }
}

// Get Single User
const getUserById = async (req, res) => {
    const { _id } = req.params;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const user = await User.findById(_id).populate('_id').lean();
        if (!user || !user.isActive) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve post.", error: error.message });
    }
}

// Get All User
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isActive: true }).lean();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve posts.", error: error.message });
    }
}

// Update User
const updateUser = async (req, res) => {
    const { _id } = req.params;
    const { username, email, mobileNumber, gender, DOB, profilePicture, profileBackground, password, address } = req.body;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.gender = gender || user.gender;
        user.DOB = DOB || user.DOB;
        user.profilePicture = profilePicture || user.profilePicture;
        user.profileBackground = profileBackground || user.profileBackground;
        user.address = address || user.address;

        // Hash password if updated
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to update user.', error: error.message });
    }
}

module.exports = { signupUser, signinUser, deleteUser, getUserById, getAllUsers, updateUser };