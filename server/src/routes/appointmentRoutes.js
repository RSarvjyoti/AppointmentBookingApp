const express = require('express');
const { getAvailableSlots, bookSlot } = require('../controllers/appointmentController');
const router = express.Router();

router.get('/slots', getAvailableSlots);
router.post('/bookSlot', bookSlot);

module.exports = router;