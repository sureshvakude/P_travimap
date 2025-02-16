const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: [String], required: true },
    description: { type: String, required: true },
    like: { type: Number, default: 0 },
    NearbyCity: { type: String, required: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    bestTimeToVisit: { type: String, required: true },
    state: { type: String, required: true },
    distanceFromNearbyPlace: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Place', PlaceSchema);