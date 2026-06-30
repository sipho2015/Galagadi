/**
 * API Utility Functions
 * Shared form submission helpers used by main.js.
 * Load before main.js on every page.
 */

(function () {
  "use strict";

  const DEFAULT_API_BASE_URL = "http://localhost:5000/api";

  const getApiBaseUrl = () => {
    const configuredUrl =
      window.GALAGADI_API_BASE_URL ||
      document.querySelector('meta[name="api-base-url"]')?.content ||
      localStorage.getItem("galagadiApiBaseUrl") ||
      DEFAULT_API_BASE_URL;

    return configuredUrl.replace(/\/$/, "");
  };

  window.submitFormToAPI = async function (formData, endpoint) {
    try {
      const response = await fetch(getApiBaseUrl() + "/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const validationMessage = Array.isArray(result.errors)
          ? result.errors.map((item) => item.msg).join(" ")
          : "";
        throw new Error(result.message || validationMessage || "Form submission failed.");
      }

      return {
        success: true,
        message: result.message || "Thank you. Your inquiry has been received.",
        emailWarning: result.emailWarning || "",
      };
    } catch (error) {
      console.error("Error submitting to " + endpoint + ":", error);

      const offlineMessage =
        error instanceof TypeError && /fetch/i.test(error.message)
          ? "We could not reach the booking system. Please start the backend on port 5000, or contact us directly at booking@galagadisafari.com / WhatsApp +263 78 236 3947."
          : error.message;

      return {
        success: false,
        message: offlineMessage || "An error occurred. Please try again later.",
      };
    }
  };

  window.checkBackendHealth = async function () {
    try {
      const response = await fetch(getApiBaseUrl() + "/health");
      return response.ok;
    } catch (error) {
      console.warn("Backend health check failed:", error.message);
      return false;
    }
  };
})();
