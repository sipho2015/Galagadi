(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const loader = document.querySelector(".loader");
  const backToTop = document.querySelector(".back-to-top");

  // Shared chrome behaviors used across every static page.
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
  };

  const hideLoader = () => {
    if (loader) loader.classList.add("hidden");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hideLoader);
  } else {
    hideLoader();
  }

  window.addEventListener("load", hideLoader);

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Reveal content only once to keep scrolling smooth on image-heavy pages.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 70));
      const tick = () => {
        current += step;
        if (current >= target) {
          element.textContent = target === 96 ? "96%" : target;
          return;
        }
        element.textContent = target === 96 ? `${current}%` : current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(element);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll("[data-counter]").forEach((element) => counterObserver.observe(element));

  // Lightweight testimonial slider for the homepage.
  const testimonials = Array.from(document.querySelectorAll(".testimonial"));
  const nextButton = document.querySelector("[data-slider-next]");
  const prevButton = document.querySelector("[data-slider-prev]");
  let slideIndex = 0;

  const showSlide = (index) => {
    testimonials.forEach((item, itemIndex) => {
      item.classList.toggle("active", itemIndex === index);
    });
  };

  const moveSlide = (direction) => {
    if (!testimonials.length) return;
    slideIndex = (slideIndex + direction + testimonials.length) % testimonials.length;
    showSlide(slideIndex);
  };

  if (testimonials.length) {
    nextButton?.addEventListener("click", () => moveSlide(1));
    prevButton?.addEventListener("click", () => moveSlide(-1));
    setInterval(() => moveSlide(1), 6500);
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // Package discovery and gallery tools are page-aware and do nothing elsewhere.
  const searchInput = document.querySelector("#package-search");
  const packageCards = Array.from(document.querySelectorAll(".package-list .package-card"));
  const noResults = document.querySelector(".no-results");

  if (searchInput && packageCards.length) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;
      packageCards.forEach((card) => {
        const matches = card.dataset.search.includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      if (noResults) noResults.hidden = visible > 0;
    });
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox img");
  const lightboxClose = document.querySelector(".lightbox-close");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      galleryItems.forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.querySelector("img");
      if (!lightbox || !lightboxImage || !image) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  // Reusable client-side validation for booking and contact forms.
  const setFieldError = (field, message) => {
    const row = field.closest(".form-row");
    if (!row) return;
    row.classList.toggle("invalid", Boolean(message));
    const output = row.querySelector("small");
    if (output) output.textContent = message;
  };

  const validateField = (field) => {
    if (field.validity.valueMissing) return "This field is required.";
    if (field.validity.typeMismatch) return "Please enter a valid value.";
    if (field.validity.patternMismatch) return "Please check the format.";
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    if (field.validity.rangeUnderflow) return `Please enter at least ${field.min}.`;
    if (field.validity.rangeOverflow) return `Please enter no more than ${field.max}.`;
    return "";
  };

  /**
   * Collect form data into an object
   */
  const getFormData = (form, isBooking = false) => {
    const formData = new FormData(form);
    const data = {};

    if (isBooking) {
      // Booking form data
      data.name = formData.get("name") || "";
      data.email = formData.get("email") || "";
      data.phone = formData.get("phone") || "";
      data.packageType = formData.get("package") || "";
      data.travelers = parseInt(formData.get("guests")) || 0;
      data.preferredDates = `${formData.get("arrival")} to ${formData.get("departure")}`;
      data.message = formData.get("requests") || "";
    } else {
      // Contact form data
      data.name = formData.get("name") || "";
      data.email = formData.get("email") || "";
      data.phone = formData.get("phone") || "";
      data.message = formData.get("message") || "";
    }

    return data;
  };

  document.querySelectorAll("[data-validated-form]").forEach((form) => {
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const success = form.querySelector(".success-message");
    const isBookingForm = form.querySelector("#package") !== null; // Check if it's booking form

    fields.forEach((field) => {
      field.addEventListener("input", () => setFieldError(field, validateField(field)));
      field.addEventListener("blur", () => setFieldError(field, validateField(field)));
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let valid = true;
      fields.forEach((field) => {
        const message = validateField(field);
        setFieldError(field, message);
        if (message) valid = false;
      });

      const arrival = form.querySelector("#arrival");
      const departure = form.querySelector("#departure");
      if (arrival && departure && arrival.value && departure.value && departure.value <= arrival.value) {
        setFieldError(departure, "Departure must be after arrival.");
        valid = false;
      }

      if (!valid) return;

      // Disable submit button to prevent double submissions
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      // Prepare form data
      const formData = getFormData(form, isBookingForm);
      const endpoint = isBookingForm ? "booking" : "contact";

      // Submit to backend via shared api.js
      const result = await window.submitFormToAPI(formData, endpoint);

      if (result.success) {
        form.reset();
        fields.forEach((field) => setFieldError(field, ""));
        if (success) {
          success.textContent = result.message;
          success.hidden = false;
          setTimeout(() => {
            success.hidden = true;
          }, 8000);
        }
      } else {
        // Show error message
        if (success) {
          success.textContent = result.message;
          success.style.background = "rgba(162, 59, 42, 0.14)";
          success.style.color = "#a23b2a";
          success.hidden = false;
          setTimeout(() => {
            success.hidden = true;
            success.style.background = "";
            success.style.color = "";
          }, 8000);
        }
      }

      // Re-enable submit button
      if (submitBtn) submitBtn.disabled = false;
    });
  });
})();
