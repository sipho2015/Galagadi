const express = require('express');
const router = express.Router();
const { validateBookingForm, submitBooking } = require('../controllers/bookingController');

/**
 * POST /api/booking
 * Submit a booking inquiry
 */
router.post('/', validateBookingForm, submitBooking);

module.exports = router;
