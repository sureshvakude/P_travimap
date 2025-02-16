const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const fs = require("fs");

const connectDB = require('./config/connectDb');
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const postRoutes = require('./routes/postRoutes');
const tripRoutes = require('./routes/tripRoutes');
const upload = require("./upload"); // Import upload middleware

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// static files
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/trips', tripRoutes);

// Image upload route
app.post("/api/image/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
        status: 200,
        message: "File uploaded successfully",
        filePath: `/uploads/${req.file.filename}`,
    });
});

// 🚀 Delete Image Route
app.delete("/api/image/delete", (req, res) => {
    const { filePath } = req.body;
    if (!filePath) {
        return res.status(400).json({ message: "File path is required" });
    }
    const absolutePath = path.join(__dirname, filePath);

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: "File not found" });
        }

        fs.unlink(absolutePath, (unlinkErr) => {
            if (unlinkErr) {
                return res.status(500).json({ message: "Error deleting file" });
            }
            res.json({ message: "File deleted successfully" });
        });
    });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));