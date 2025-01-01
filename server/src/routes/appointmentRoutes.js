const express = require('express');
const { getAvailableSlots, bookSlot } = require('../controllers/appointmentController');
const router = express.Router();

// Route to get available slots
router.get('/slots', getAvailableSlots);

// Route to book a slot
router.post('/bookSlot', bookSlot);

module.exports = router;