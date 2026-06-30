/**
 * API Utility Functions
 * Handles communication with the backend
 */

// Backend API URL (change this when deploying)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Submit contact form to backend
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Contact form error:', error);
    return { 
      success: false, 
      message: error.message || 'An error occurred. Please try again.'
    };
  }
};

/**
 * Submit booking form to backend
 */
export const submitBookingForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit booking');
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Booking form error:', error);
    return { 
      success: false, 
      message: error.message || 'An error occurred. Please try again.'
    };
  }
};

/**
 * Health check - verify backend is running
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return false;
  }
};
