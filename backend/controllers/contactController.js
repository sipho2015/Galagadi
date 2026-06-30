const { body, validationResult } = require('express-validator');
const { sendConfirmationEmail, sendAdminNotification } = require('../config/email');

/**
 * Validation middleware for contact form
 */
const validateContactForm = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^[0-9+()\s-]{7,}$/)
    .withMessage('Invalid phone number'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

/**
 * Handle contact form submission
 */
const submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, phone, message } = req.body;

    // Log the submission
    console.log('Contact form submission:', { name, email, phone, message });

    const [confirmationSent, adminNotified] = await Promise.all([
      sendConfirmationEmail(email, name, 'contact'),
      sendAdminNotification({ name, email, phone, message }, 'contact')
    ]);

    res.json({
      success: true,
      message: 'Your message has been received successfully! We will get back to you soon.',
      emailWarning: !confirmationSent || !adminNotified
        ? 'Email delivery is not configured yet, but the submission was logged on the server.'
        : ''
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

module.exports = {
  validateContactForm,
  submitContact
};
