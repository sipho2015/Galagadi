# Galagadi Tours & Safari Website

A fully functional safari and travel website with a modern HTML/CSS/JavaScript frontend and Node.js/Express backend for form handling and email notifications.

## Project Structure

The project is organized into two main folders:

```
Galagadi/
├── frontend/                   # All frontend files (HTML, CSS, JS, images, assets)
│   ├── index.html
│   ├── about.html
│   ├── activities.html
│   ├── booking.html
│   ├── contact.html
│   ├── destinations.html
│   ├── gallery.html
│   ├── packages.html
│   ├── privacy-policy.html
│   ├── refund-policy.html
│   ├── terms-of-use.html
│   ├── css/
│   │   └── styles.css         # Main stylesheet with color system
│   ├── js/
│   │   ├── main.js            # Core functionality and form handling
│   │   └── api.js             # Backend API utilities
│   ├── images/                # Local images folder
│   ├── assets/                # Downloadables and resources
│   ├── run-site.bat          # Quick launcher
│   └── README.md              # Frontend documentation
│
├── backend/                    # Node.js/Express backend
│   ├── server.js              # Express server entry point
│   ├── package.json           # Dependencies: express, nodemailer, cors, etc.
│   ├── config/
│   │   └── email.js           # Nodemailer configuration
│   ├── controllers/
│   │   ├── contactController.js   # Contact form handler
│   │   └── bookingController.js   # Booking form handler
│   ├── routes/
│   │   ├── contact.js         # POST /api/contact
│   │   └── booking.js         # POST /api/booking
│   ├── .env.example           # Template for environment variables
│   └── README.md              # Backend documentation
│
├── IMPLEMENTATION_SUMMARY.md  # Full architecture overview
├── BACKEND_QUICKSTART.md      # Backend setup guide with Gmail config
├── DEPLOYMENT_GUIDE.md        # Deployment instructions
└── PROJECT_CHECKLIST.md       # Task completion tracking
```

## Frontend Features

### Pages (11 Total)
- **index.html** - Premium homepage with hero, featured packages, destinations, live counters, testimonials, and FAQs
- **about.html** - Company story, mission, vision, and local expert biography
- **packages.html** - Searchable safari package listings with details
- **destinations.html** - Victoria Falls, Chobe, Zambezi River highlights
- **activities.html** - Adventure, wildlife, culture, dining, and transfer activities
- **gallery.html** - Filterable photo gallery with lightbox modal
- **booking.html** - Validated booking inquiry form with bank details
- **contact.html** - Contact form, business info, and location
- **privacy-policy.html** - Full privacy policy
- **refund-policy.html** - Complete refund guidelines
- **terms-of-use.html** - Terms and conditions

### Design System

**Color Palette** (CSS variables in `frontend/css/styles.css`):
- `--ink` (#17201d) - Primary text
- `--muted` (#69756f) - Secondary text
- `--paper` (#fbfaf6) - Light background
- `--sand` (#e8ddc8) - Warm accent
- `--moss` (#52664b) - Green accent
- `--copper` (#b56b39) - Bronze accent
- `--night` (#101615) - Dark background
- `--error` (#a23b2a) - Error state

**Responsive Breakpoints**:
- Desktop: Full width
- Tablet (≤960px): 2-column layouts
- Mobile (≤640px): 1-column layouts

### Functionality
- ✅ Navigation with smooth scrolling
- ✅ Header transparency with scroll effects
- ✅ Loading spinner animation
- ✅ Animated content reveals
- ✅ Live counter animations
- ✅ Testimonial carousel
- ✅ FAQ accordion
- ✅ Package search/filtering
- ✅ Gallery filtering with lightbox
- ✅ WhatsApp floating button on all pages
- ✅ Back-to-top button
- ✅ Mobile hamburger menu
- ✅ Form validation (client-side)

## Backend Features

**Technology Stack**:
- Node.js + Express.js server
- Nodemailer for email delivery
- Express-validator for server-side validation
- CORS enabled for frontend requests
- Environment variables for secure config

**API Endpoints**:
- `POST /api/contact` - Contact form submission
- `POST /api/booking` - Booking inquiry submission
- `GET /api/health` - Backend health check

**Email Features**:
- Confirmation email to user
- Admin notification with inquiry details
- HTML-formatted emails
- Error handling and logging

## Quick Start

### Frontend (Frontend Only)
```bat
cd frontend
.\run-site.bat
```
This opens the site in your browser directly (no backend required for UI).

### Full Stack (Frontend + Backend with Forms)

**1. Start Backend** (Terminal 1):
```bash
cd backend
npm install
# Create .env file with Gmail credentials (see BACKEND_QUICKSTART.md)
npm run dev
# Runs on http://localhost:5000
```

**2. Start Frontend** (Terminal 2):
```bash
cd frontend
# Open in browser at http://localhost:3000 or use run-site.bat
# For live reload, use your preferred HTTP server
```

**3. Test Forms**:
- Open http://localhost/frontend/contact.html
- Fill out and submit (sends to backend)
- Check email for confirmations

## Documentation

- [**IMPLEMENTATION_SUMMARY.md**](IMPLEMENTATION_SUMMARY.md) - Complete architecture, codebase overview, and integration details
- [**BACKEND_QUICKSTART.md**](BACKEND_QUICKSTART.md) - Backend setup with step-by-step Gmail app-password configuration
- [**DEPLOYMENT_GUIDE.md**](DEPLOYMENT_GUIDE.md) - Production deployment options (Vercel, Heroku, Railway, AWS, DigitalOcean)
- [**PROJECT_CHECKLIST.md**](PROJECT_CHECKLIST.md) - Feature completion tracking
- [**frontend/README.md**](frontend/README.md) - Frontend-specific documentation

## Next Steps

1. **Email Configuration**: Add Gmail app-specific password to `/backend/.env`
2. **Test Backend Connection**: Run backend and test forms
3. **Deployment**: Follow DEPLOYMENT_GUIDE.md for production setup
4. **Database**: Phase 2 - Add database for inquiry history (MongoDB or PostgreSQL)
5. **Payment**: Phase 3 - Integrate payment processing (Stripe/PayPal)

## Notes

- All external images from Unsplash CDN (no local dependencies)
- Forms work without backend (show success message locally)
- Forms send emails when backend is running
- Fully responsive and accessible (WCAG compliant)
- No frontend frameworks - vanilla JavaScript for performance
