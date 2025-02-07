const express = require('express');
const router = express.Router();
const { addPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace } = require('../controllers/placeController');

router.get('/', getAllPlaces); // Get All Places
router.get('/:_id', getPlaceById); // Get Single Place
router.post('/', addPlace); // Add Place
router.put('/:_id', updatePlace); // Update Place
router.delete('/:_id', deletePlace); // Delete Place

module.exports = router;