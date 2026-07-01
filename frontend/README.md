# Galagadi Frontend

This folder contains all frontend files for the Galagadi Tours & Safari website.

## File Structure

```
frontend/
├── index.html                 # Homepage
├── about.html                 # About page
├── activities.html            # Activities listing
├── booking.html               # Booking form
├── contact.html               # Contact form
├── destinations.html          # Destinations showcase
├── gallery.html               # Photo gallery
├── packages.html              # Safari packages
├── privacy-policy.html        # Privacy policy
├── refund-policy.html         # Refund policy
├── terms-of-use.html          # Terms of use
├── css/
│   └── styles.css             # Main stylesheet with color variables
├── js/
│   ├── main.js                # Main JavaScript (forms, interactions, backend integration)
│   └── api.js                 # API utility functions
├── images/                    # Image folder (for local images)
├── assets/                    # Assets folder (for downloadables, etc.)
└── run-site.bat              # Windows batch file to open index.html
```

## Colors Used

The site uses a carefully curated color palette defined in `css/styles.css` as CSS variables:

- **--ink** (#17201d) - Dark text
- **--muted** (#69756f) - Secondary text
- **--paper** (#fbfaf6) - Light background
- **--sand** (#e8ddc8) - Warm accent background
- **--moss** (#52664b) - Green accent
- **--copper** (#b56b39) - Bronze/orange accent
- **--night** (#101615) - Dark background
- **--white** (#ffffff) - Pure white
- **--error** (#a23b2a) - Error state

## Backend Integration

All forms (Contact and Booking) are connected to the backend API at `http://localhost:5000/api`:

- `POST /api/contact` - Contact form submissions
- `POST /api/booking` - Booking form submissions

Forms are validated client-side and submitted to the backend which sends confirmation emails.

## Running Locally

### Quick Start (Windows)
Double-click `run-site.bat` to serve the site and open `http://localhost:3000/` in your default browser.

### With Local Server
For better development and to avoid CORS issues with the backend:

```bash
# Using Python (if available)
python -m http.server 3000

# Then visit: http://localhost:3000
```

## Backend Setup

To enable form submissions and email notifications, you need to set up the backend:

1. Navigate to the `/backend` folder
2. Run `npm install` to install dependencies
3. Create `.env` file with Gmail credentials (see `BACKEND_QUICKSTART.md`)
4. Run `npm run dev` to start the backend server on port 5000

## Responsive Design

The site is fully responsive with breakpoints at:
- **960px** - Tablet view (2-column grid layouts)
- **640px** - Mobile view (1-column layouts)

## Features

- ✅ 11 fully-functional pages
- ✅ Contact and Booking forms with validation
- ✅ WhatsApp floating button on all pages
- ✅ Image gallery with filtering and lightbox
- ✅ Testimonial slider
- ✅ FAQ accordion
- ✅ Responsive design
- ✅ Backend form submission with email notifications
- ✅ Loading states and animations

## Notes

- All external images are from Unsplash CDN
- Forms will only send emails when backend is running
- The site uses vanilla JavaScript (no frameworks)
- All interactions are smooth and accessible
