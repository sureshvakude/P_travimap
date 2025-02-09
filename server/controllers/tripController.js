const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        console.log(trip);
        await trip.save();
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single trip by ID
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a trip by ID
exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a trip by ID
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};