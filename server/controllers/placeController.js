const Place = require('../models/Place');

// Add New Place
const addPlace = async (req, res) => {
    const { name, img, description, NearbyCity, like, category, region, bestTimeToVisit, state, distanceFromNearbyPlace, rating } = req.body;

    try {
        const newPlace = await Place.create({ name, img, description, NearbyCity, like, category, region, bestTimeToVisit, state, distanceFromNearbyPlace, rating });
        res.status(201).json(newPlace);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to add place.', error: error.message });
    }
}

// Get All Places
const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find().lean();
        res.status(200).json(places);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve places.", error: error.message });
    }
}

// Get single place
const getPlaceById = async (req, res) => {
    const { _id } = req.params;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const place = await Place.findById(_id).populate('userId').lean();
        if (!place) return res.status(404).json({ message: "Place not found" });
        res.status(200).json(place);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve place", error: error.message });
    }
}

// Update a Place
const updatePlace = async (req, res) => {
    const { _id } = req.params;
    const { name, img, description, NearbyCity, like, category, region, bestTimeToVisit, state, distanceFromNearbyPlace, rating } = req.body;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid place ID format" });
    }

    try {
        const updatedPlace = await Place.findByIdAndUpdate(_id,
            { name, img, description, NearbyCity, like, category, region, bestTimeToVisit, state, distanceFromNearbyPlace, rating },
            { new: true }
        ).lean();
        if (!updatedPlace) return res.status(404).json({ message: "Place not found" });
        res.status(200).json(updatedPlace);
    } catch (error) {
        res.status(500).json({ message: "Unable to update post", error: error.message });
    }
};

// Delete a Place
const deletePlace = async (req, res) => {
    const { _id } = req.params;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid place ID format" });
    }

    try {
        const deletedPlace = await Place.findByIdAndDelete(_id);
        if (!deletedPlace) return res.status(404).json({ message: "Place not found" });
        res.status(200).json({ message: "Place deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete place", error: error.message });
    }
};

module.exports = {addPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace};