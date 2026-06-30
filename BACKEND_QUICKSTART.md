# Backend Setup Complete! ✅

Your Galagadi website now has a fully functional Node.js + Express backend ready to handle forms and send emails!

## What Was Built

### Backend Files Created:
```
backend/
├── server.js                    # Main server (handles requests, middleware, routing)
├── package.json                 # Dependencies list
├── .env.example                 # Template for environment variables
├── setup.bat / setup.sh         # Quick setup scripts
├── config/
│   └── email.js                # Email configuration & sending logic
├── controllers/
│   ├── contactController.js    # Contact form handler + validation
│   └── bookingController.js    # Booking form handler + validation
└── routes/
    ├── contact.js              # Contact form endpoint
    └── booking.js              # Booking form endpoint
```

### Frontend Updates:
- ✅ Updated `js/main.js` - Forms now submit to backend
- ✅ Created `js/api.js` - API utility functions
- ✅ Updated `booking.html` - Form connected to backend
- ✅ Updated `contact.html` - Added phone field, connected to backend

---

## Quick Start (Windows)

### 1️⃣ Navigate to backend folder:
```cmd
cd backend
```

### 2️⃣ Configure Email (Gmail):
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device type
3. Copy the generated password
4. Open `.env` file and update:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password-here
   CONTACT_EMAIL=booking@galagadisafari.com
   ```

### 3️⃣ Install Dependencies:
```cmd
npm install
```

### 4️⃣ Start Backend Server:
```cmd
npm run dev
```

You should see:
```
╔════════════════════════════════════════╗
║  Galagadi Backend Server Running       ║
║  Port: 5000                            ║
║  Environment: development              ║
╚════════════════════════════════════════╝
```

### 5️⃣ Test It:
Open in browser: `http://localhost:5000/api/health`

Should return: `{"status":"Server is running",...}`

---

## How It Works

### Contact Form Flow:
```
User fills form on contact.html
      ↓
Frontend validates form (instant feedback)
      ↓
User submits → JavaScript calls POST /api/contact
      ↓
Backend receives data
      ↓
Backend validates data (security check)
      ↓
Send confirmation email to user
      ↓
Send notification email to you
      ↓
Return success message to user
```

### Booking Form Flow:
```
Same as contact but to POST /api/booking
Includes: package type, dates, number of travelers
```

---

## Email Configuration

### Gmail Setup (Recommended):
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" → select device → generate password
3. Paste into `.env` as `EMAIL_PASS`

### Other Email Services:
Update `.env` with your provider:
- **Outlook/Hotmail**: `EMAIL_SERVICE=outlook`
- **Yahoo**: `EMAIL_SERVICE=yahoo`
- **Custom SMTP**: Update `SMTP_HOST`, `SMTP_PORT`, etc.

See Nodemailer docs for more: https://nodemailer.com/

---

## Frontend Configuration

### Update Backend URL (when deploying):
In `js/main.js`, change:
```javascript
const API_URL = "http://localhost:5000/api";  // ← Change this
```

To your production URL:
```javascript
const API_URL = "https://your-backend-url.com/api";
```

---

## Testing Checklist

- [ ] Backend server running (`npm run dev`)
- [ ] `.env` file configured with email settings
- [ ] `http://localhost:5000/api/health` returns 200 OK
- [ ] Go to `http://localhost:3000/contact.html`
- [ ] Fill out contact form and submit
- [ ] Check your email for:
  - Confirmation email to user
  - Notification email to admin
- [ ] Same for booking form (`booking.html`)

---

## Deployment

### Free Options:
1. **Vercel** (Recommended) - https://vercel.com
2. **Railway** - https://railway.app
3. **Render** - https://render.com

### Paid Options:
1. **Heroku** - https://www.heroku.com
2. **AWS** - https://aws.amazon.com
3. **DigitalOcean** - https://www.digitalocean.com

**See DEPLOYMENT_GUIDE.md for step-by-step instructions**

---

## Project Structure

```
Galagadi/
├── index.html              # Frontend pages
├── booking.html            # ← Now connected to backend
├── contact.html            # ← Now connected to backend
├── css/styles.css
├── js/
│   ├── main.js            # ← Updated with backend calls
│   └── api.js             # ← New API utility
├── backend/               # ← NEW: Backend server
│   ├── server.js
│   ├── package.json
│   ├── .env               # Your email config
│   └── [routes, controllers, config]
└── DEPLOYMENT_GUIDE.md    # ← Deployment instructions
```

---

## What Users Experience

### Contact Form:
1. Fill out form (name, email, optional phone, message)
2. Click "Send Message"
3. See success message: "Your message has been sent successfully! We will get back to you soon."
4. User receives confirmation email
5. You receive notification email with their message

### Booking Form:
1. Fill out form (name, email, phone, package, dates, travelers)
2. Click "Send Inquiry"
3. See success message: "Your booking inquiry has been received! We will contact you shortly to confirm details."
4. User receives confirmation email
5. You receive notification email with booking details

---

## Troubleshooting

### Error: "Cannot POST /api/contact"
- Backend not running - Run `npm run dev`
- Check backend is on `http://localhost:5000/api/health`

### Error: "Module not found"
- Dependencies not installed - Run `npm install`

### Emails not sending
- `.env` not configured - Check EMAIL_USER and EMAIL_PASS
- Gmail account needs app-specific password
- Check backend logs for error messages

### CORS Error in Browser Console
- Backend CORS not set up - Already configured in server.js
- Frontend URL might be wrong - Update FRONTEND_URL in .env

---

## Next Steps

1. **Test locally** - Follow "Quick Start" section above
2. **Verify emails work** - Send test form submissions
3. **Deploy backend** - Choose hosting (Vercel, Railway, Heroku, etc.)
4. **Update frontend URLs** - Point to production backend
5. **Deploy frontend** - Push to GitHub Pages, Netlify, or Vercel
6. **Add database** (Phase 2) - Store submissions, track bookings

---

## File Locations

| File | Purpose |
|------|---------|
| `backend/.env` | Email & config settings (CREATE THIS) |
| `backend/server.js` | Main backend application |
| `backend/package.json` | Dependencies & scripts |
| `backend/config/email.js` | Email setup & sending |
| `backend/controllers/*.js` | Form logic |
| `backend/routes/*.js` | API endpoints |
| `js/main.js` | Form submission to backend |
| `booking.html` | Booking form (updated) |
| `contact.html` | Contact form (updated) |

---

## Commands Reference

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Install a new package
npm install package-name

# Update all packages
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

---

## Support

- Express.js Docs: https://expressjs.com/
- Nodemailer: https://nodemailer.com/
- Node.js: https://nodejs.org/
- VS Code Docs: https://code.visualstudio.com/docs

---

**🎉 Your website is now ready to receive real inquiries and bookings!**

Questions? Check the backend logs or browser console (F12) for detailed error messages.
