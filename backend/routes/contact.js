const express = require('express');
const router = express.Router();
const { 
  validateContactForm, 
  submitContact 
} = require('../controllers/contactController');

router.post(
  '/', 
  validateContactForm,
  submitContact
);

module.exports = router;