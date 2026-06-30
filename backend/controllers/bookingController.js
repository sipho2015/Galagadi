const { body, validationResult } = require('express-validator');
const { sendConfirmationEmail, sendAdminNotification } = require('../config/email');

/**
 * Validation middleware for booking form
 */
const validateBookingForm = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').matches(/^[0-9+()\s-]{7,}$/).withMessage('Invalid phone number'),
  body('packageType').notEmpty().withMessage('Package type is required'),
  body('preferredDates').notEmpty().withMessage('Preferred dates are required'),
  body('travelers').isInt({ min: 1 }).withMessage('Number of travelers must be at least 1'),
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage('Special requests must be at least 5 characters')
];

/**
 * Handle booking form submission
 */
const submitBooking = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, phone, packageType, preferredDates, travelers, budget, message } = req.body;

    // Log the submission
    console.log('Booking form submission:', { name, email, phone, packageType, preferredDates, travelers });

    const bookingData = {
      name,
      email,
      phone,
      packageType,
      preferredDates,
      travelers,
      budget,
      message
    };
    const [confirmationSent, adminNotified] = await Promise.all([
      sendConfirmationEmail(email, name, 'booking'),
      sendAdminNotification(bookingData, 'booking')
    ]);

    res.json({
      success: true,
      message: 'Your booking inquiry has been received! We will contact you shortly to confirm details.',
      emailWarning: !confirmationSent || !adminNotified
        ? 'Email delivery is not configured yet, but the booking was logged on the server.'
        : ''
    });

  } catch (error) {
    console.error('Error submitting booking form:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your booking.'
    });
  }
};

module.exports = {
  validateBookingForm,
  submitBooking
};
