const express = require('express');
const router = express.Router();
const { 
  validateBookingForm, 
  submitBooking, 
  bookingRateLimiter 
} = require('../controllers/bookingController');

router.post(
  '/', 
  bookingRateLimiter,
  validateBookingForm,
  submitBooking
);

module.exports = router;