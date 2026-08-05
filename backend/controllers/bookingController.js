const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendConfirmationEmail, sendAdminNotification } = require('../config/email');
const fs = require('fs').promises;
const path = require('path');

// ============================================
// STEP 1: RATE LIMITING
// ============================================
const bookingRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 booking requests per window
  message: {
    success: false,
    message: 'Too many booking requests. Please wait an hour before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================
// STEP 2: DUPLICATE SUBMISSION CACHE
// ============================================
const submissionCache = new Map();

const checkDuplicate = (email, packageType, preferredDates) => {
  const key = `${email}-${packageType}-${preferredDates}`;
  const lastSubmission = submissionCache.get(key);
  
  if (lastSubmission) {
    const timeSince = Date.now() - lastSubmission;
    if (timeSince < 5 * 60 * 1000) { // 5 minutes cooldown
      return true;
    }
  }
  
  submissionCache.set(key, Date.now());
  
  // Clean up old entries (keep last 1000)
  if (submissionCache.size > 1000) {
    const entries = Array.from(submissionCache.entries());
    entries.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < 100; i++) {
      submissionCache.delete(entries[i][0]);
    }
  }
  return false;
};

// ============================================
// STEP 3: ENHANCED VALIDATION
// ============================================
const validateBookingForm = [
  // Name - with special character check
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name contains invalid characters'),
  
  // Email - with domain blocking
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom((value) => {
      // Block disposable/temporary email domains
      const blockedDomains = ['tempmail.com', 'throwaway.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com'];
      const domain = value.split('@')[1];
      if (blockedDomains.includes(domain)) {
        throw new Error('Please use a valid email address (temporary emails are not allowed)');
      }
      return true;
    }),
  
  // Phone - comprehensive validation
  body('phone')
    .matches(/^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)
    .withMessage('Please enter a valid phone number with country code if needed')
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 digits'),
  
  // Package Type - whitelist
  body('packageType')
    .notEmpty()
    .withMessage('Package type is required')
    // These values are submitted by frontend/booking.html. Keep this list in
    // sync with that select rather than rejecting every real site inquiry.
    .isIn([
      'Victoria Falls Itinerary',
      'Victoria Falls & Chobe Day Trip Itinerary',
      'Victoria Falls & Chobe Safari Itinerary',
      'Build Your Own Trip'
    ])
    .withMessage('Invalid package type selected'),
  
  // Preferred Dates - future date validation
  body('preferredDates')
    .notEmpty()
    .withMessage('Preferred dates are required')
    .custom((value) => {
      // The booking form submits a range, e.g. "2026-08-10 to 2026-08-14".
      // Accept that format and single dates while validating real calendar
      // values without relying on browser-dependent Date parsing.
      const rawDates = value.split(/\s+to\s+|,/i).map(date => date.trim()).filter(Boolean);
      const dates = rawDates.map((dateString) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
        const date = new Date(`${dateString}T00:00:00`);
        // Date normalizes invalid values such as 2026-02-31 to March 3, so
        // compare the normalized components before accepting the value.
        return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateString
          ? null
          : date;
      });
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dates.length === 0 || dates.length > 10 || dates.some((date) => !date)) {
        throw new Error('Please provide between 1 and 10 preferred dates');
      }
      
      for (const date of dates) {
        if (date < today) {
          throw new Error('Preferred dates must be in the future');
        }
      }

      if (dates.length === 2 && dates[1] <= dates[0]) {
        throw new Error('Departure date must be after arrival date');
      }
      return true;
    }),
  
  // Travelers - with max limit
  body('travelers')
    .isInt({ min: 1, max: 50 })
    .withMessage('Number of travelers must be between 1 and 50'),
  
  // Budget - optional but validate if provided
  body('budget')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Budget must be a number')
    .custom((value) => {
      const numValue = parseFloat(value);
      if (numValue < 100) {
        throw new Error('Minimum budget is $100');
      }
      if (numValue > 1000000) {
        throw new Error('Budget exceeds maximum allowed amount');
      }
      return true;
    }),
  
  // Message - enhanced validation
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message must not exceed 2000 characters')
    .escape() // Prevent XSS
    .matches(/^[^<>]*$/)
    .withMessage('Message contains invalid characters'),
];

// ============================================
// STEP 4: HELPER FUNCTIONS
// ============================================
const sanitizeInput = (data) => {
  const sanitized = {};
  for (let [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim().replace(/<[^>]*>/g, ''); // Strip HTML
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

const logSubmission = async (data) => {
  try {
    // Ensure logs directory exists
    const logDir = path.join(__dirname, '..', 'logs');
    await fs.mkdir(logDir, { recursive: true });
    
    const logEntry = {
      ...data,
      loggedAt: new Date().toISOString()
    };
    
    const logFile = path.join(logDir, 'bookings.jsonl');
    await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
  } catch (error) {
    console.error('Failed to log booking:', error);
    // Don't throw - logging failure shouldn't stop the response
  }
};

const sendWebhookNotifications = async (bookingData) => {
  try {
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhook) return;
    
    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `📅 **New Booking Inquiry**\n*Name:* ${bookingData.name}\n*Email:* ${bookingData.email}\n*Phone:* ${bookingData.phone}\n*Package:* ${bookingData.packageType}\n*Travelers:* ${bookingData.travelers}\n*Dates:* ${bookingData.preferredDates}\n*Budget:* ${bookingData.budget || 'Not specified'}\n*Reference:* ${bookingData.id}`
      })
    });
    
    if (!response.ok) {
      console.warn('Slack webhook failed:', response.status);
    }
  } catch (error) {
    console.warn('Webhook failed:', error.message);
    // Don't throw - webhook failure shouldn't stop the response
  }
};

const generateReference = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `BK-${timestamp}-${random}`;
};

// ============================================
// STEP 5: MAIN SUBMIT FUNCTION
// ============================================
const submitBooking = async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        })),
        message: 'Please fix the validation errors'
      });
    }

    // Sanitize input
    const sanitizedData = sanitizeInput(req.body);
    const { name, email, phone, packageType, preferredDates, travelers, budget, message } = sanitizedData;

    // Check for duplicate submissions
    if (checkDuplicate(email, packageType, preferredDates)) {
      return res.status(429).json({
        success: false,
        message: 'A similar booking was submitted recently. Please wait a few minutes before trying again.',
        retryAfter: 300 // 5 minutes in seconds
      });
    }

    // Generate booking reference
    const bookingRef = generateReference();

    // Prepare booking data
    const bookingData = {
      id: bookingRef,
      name,
      email,
      phone,
      packageType,
      preferredDates,
      travelers: parseInt(travelers),
      budget: budget || 'Not specified',
      message: message || 'No special requests',
      submittedAt: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    // Log the submission
    console.log('Booking submission:', {
      reference: bookingRef,
      email,
      packageType,
      travelers,
      timestamp: new Date().toISOString()
    });

    // Send emails with timeout handling
    const emailTimeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email timeout')), 10000);
    });

    let confirmationSent = false;
    let adminNotified = false;

    try {
      const emailPromises = [
        sendConfirmationEmail(email, name, 'booking'),
        sendAdminNotification(bookingData, 'booking')
      ];
      
      const results = await Promise.race([
        Promise.all(emailPromises),
        emailTimeout
      ]);
      
      // If we get here, emails completed successfully
      if (Array.isArray(results)) {
        confirmationSent = results[0] || false;
        adminNotified = results[1] || false;
      }
    } catch (emailError) {
      console.warn('Email sending issue:', emailError.message);
      // Still succeed - we'll log the booking and continue
      // But we'll let the user know emails may be delayed
    }

    // Send webhook notifications (non-blocking)
    sendWebhookNotifications(bookingData).catch(console.warn);

    // Log submission to file (non-blocking)
    logSubmission(bookingData).catch(console.warn);

    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Return success response
    res.status(201).json({
      success: true,
      reference: bookingRef,
      message: 'Your booking inquiry has been received!',
      details: {
        package: packageType,
        travelers: travelers,
        dates: preferredDates,
        name: name
      },
      emailStatus: {
        confirmation: confirmationSent ? 'sent' : 'not sent',
        admin: adminNotified ? 'sent' : 'not sent',
        note: confirmationSent && adminNotified
          ? 'All emails sent successfully'
          : 'The booking was recorded, but email delivery could not be confirmed.'
      },
      emailWarning: !confirmationSent || !adminNotified
        ? 'Email delivery is not configured or could not be confirmed, but your booking was recorded.'
        : '',
      nextSteps: 'Our team will contact you within 24 hours to confirm your booking.',
      responseTime: `${responseTime}ms`
    });

  } catch (error) {
    console.error('Booking submission error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Different status codes for different errors
    let statusCode = 500;
    let message = 'An error occurred while processing your booking.';
    
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = error.message;
    } else if (error.code === 'ECONNREFUSED') {
      statusCode = 503;
      message = 'Our booking service is temporarily unavailable. Please try again later.';
    } else if (error.code === 'ETIMEOUT') {
      statusCode = 504;
      message = 'The booking service timed out. Please try again.';
    }

    res.status(statusCode).json({
      success: false,
      message: message,
      reference: `ERR${Date.now()}`,
      retryAfter: 60 // seconds
    });
  }
};

// ============================================
// STEP 6: EXPORT ALL
// ============================================
module.exports = {
  validateBookingForm,
  submitBooking,
  bookingRateLimiter,
  // Export helpers for testing
  checkDuplicate,
  generateReference,
  sanitizeInput
};
