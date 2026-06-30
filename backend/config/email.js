const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const emailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.CONTACT_EMAIL);
const EMAIL_TIMEOUT_MS = Number(process.env.EMAIL_TIMEOUT_MS || 8000);

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection when SMTP credentials are available.
if (emailConfigured) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('Email configuration error:', error);
    } else {
      console.log('Email service is ready to send messages');
    }
  });
} else {
  console.warn('Email is not configured. Form submissions will be logged, but emails will not be sent.');
}

const sendMailWithTimeout = (mailOptions) => Promise.race([
  transporter.sendMail(mailOptions),
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Email send timed out after ${EMAIL_TIMEOUT_MS}ms`)), EMAIL_TIMEOUT_MS);
  })
]);

/**
 * Send confirmation email to user
 */
const sendConfirmationEmail = async (userEmail, userName, type = 'contact') => {
  if (!emailConfigured) return false;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: type === 'booking' 
      ? 'Booking Inquiry Received - Galagadi Tours & Safari' 
      : 'We Received Your Message - Galagadi Tours & Safari',
    html: `
      <h2>Thank You, ${userName}!</h2>
      <p>We have received your ${type === 'booking' ? 'booking inquiry' : 'message'}.</p>
      <p>Our team will review your request and get back to you within 24 hours.</p>
      <p>In the meantime, feel free to contact us on WhatsApp: <strong>+263 78 236 3947</strong></p>
      <br>
      <p>Best regards,<br>
      <strong>Galagadi Tours & Safari Team</strong></p>
      <hr>
      <p><small>This is an automated response. Please do not reply to this email.</small></p>
    `
  };

  try {
    await sendMailWithTimeout(mailOptions);
    console.log(`Confirmation email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

/**
 * Send inquiry email to admin
 */
const sendAdminNotification = async (data, type = 'contact') => {
  if (!emailConfigured) return false;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    subject: type === 'booking' 
      ? `New Booking Inquiry: ${data.packageType || 'Custom'} - ${data.name}` 
      : `New Contact Message from ${data.name}`,
    html: `
      <h2>${type === 'booking' ? 'New Booking Inquiry' : 'New Contact Message'}</h2>
      <p><strong>From:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      ${type === 'booking' ? `
        <p><strong>Package Type:</strong> ${data.packageType || 'N/A'}</p>
        <p><strong>Preferred Dates:</strong> ${data.preferredDates || 'N/A'}</p>
        <p><strong>Number of Travelers:</strong> ${data.travelers || 'N/A'}</p>
      ` : ''}
      <hr>
      <h3>Message:</h3>
      <p>${(data.message || 'No message provided').replace(/\n/g, '<br>')}</p>
      <hr>
      <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  try {
    await sendMailWithTimeout(mailOptions);
    console.log(`Admin notification sent to ${process.env.CONTACT_EMAIL}`);
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
};

module.exports = {
  sendConfirmationEmail,
  sendAdminNotification,
  transporter
};
