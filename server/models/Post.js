const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: [String],
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String]
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostSchema);