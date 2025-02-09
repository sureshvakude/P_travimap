const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    explorePlaces: [{ type: String }],
    itinerary: [{
        day: { type: Number },
        activities: [{
            time: { type: String },
            description: { type: String },
            cost: { type: Number }
        }]
    }],
    type: { type: String, enum: ['private', 'public'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);