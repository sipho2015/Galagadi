/**
 * API Utility Functions
 * Shared form submission helpers used by main.js
 * Load before main.js on every page.
 */

(function () {
  "use strict";

  // Backend API URL — update this when deploying
  const API_BASE_URL = "http://localhost:5000/api";

  /**
   * Submit form data to a backend endpoint
   */
  window.submitFormToAPI = async function (formData, endpoint) {
    try {
      const response = await fetch(API_BASE_URL + "/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Form submission failed");
      }

      return { success: true, message: result.message };
    } catch (error) {
      console.error("Error submitting to " + endpoint + ":", error);
      return {
        success: false,
        message: error.message || "An error occurred. Please try again later.",
      };
    }
  };

  /**
   * Check if the backend is reachable
   */
  window.checkBackendHealth = async function () {
    try {
      const response = await fetch(API_BASE_URL + "/health");
      return response.ok;
    } catch (error) {
      console.warn("Backend health check failed:", error.message);
      return false;
    }
  };
})();
