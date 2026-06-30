const express = require('express');
const router = express.Router();
const { validateContactForm, submitContact } = require('../controllers/contactController');

/**
 * POST /api/contact
 * Submit a contact form
 */
router.post('/', validateContactForm, submitContact);

module.exports = router;
