# Galagadi Tours & Safari - Full Setup Guide

## Project Structure
```
Galagadi/
├── frontend/                    # Website files (HTML, CSS, JS)
│   ├── index.html
│   ├── booking.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   │   ├── main.js             # Updated with backend integration
│   │   └── api.js              # API utility functions
│   └── assets/
├── backend/                     # Node.js Express server
│   ├── server.js               # Main server file
│   ├── package.json
│   ├── .env.example            # Copy to .env and configure
│   ├── config/
│   │   └── email.js            # Email configuration
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── bookingController.js
│   └── routes/
│       ├── contact.js
│       └── booking.js
└── README.md
```

---

## STEP 1: Configure Email (Gmail Example)

### For Gmail:
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Generate an app-specific password
4. Copy the generated password

### Create `.env` file in backend folder:
```bash
cd backend
cp .env.example .env
```

### Edit `.env` with your Gmail credentials:
```
PORT=5000
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-generated-app-password
CONTACT_EMAIL=booking@galagadisafari.com
FRONTEND_URL=http://localhost:3000
```

---

## STEP 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- **express**: Web framework
- **cors**: Enable cross-origin requests
- **nodemailer**: Email sending
- **express-validator**: Form validation
- **dotenv**: Environment variables

---

## STEP 3: Start the Backend Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  Galagadi Backend Server Running       ║
║  Port: 5000                            ║
║  Environment: development              ║
╚════════════════════════════════════════╝
```

### Test the server:
Open `http://localhost:5000/api/health` in your browser
Should return: `{"status":"Server is running",...}`

---

## STEP 4: Test Forms Locally

1. **Keep backend running** in one terminal
2. Open frontend website in another terminal or browser
3. Go to Contact or Booking page
4. Fill out form and submit
5. Check backend terminal for logs
6. Check your email for confirmation

---

## API Endpoints

### Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+263 78 236 3947",
  "message": "I'd like more information..."
}
```

### Booking Form
```
POST /api/booking
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+263 78 236 3947",
  "packageType": "Victoria Falls Itinerary",
  "travelers": 2,
  "preferredDates": "2026-08-01 to 2026-08-04",
  "message": "Special requests..."
}
```

---

## Deployment Options

### Option 1: Vercel (Recommended for beginners)
- Free tier available
- Easy GitHub integration
- Automatic deploys

**Setup:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repo
4. Add environment variables in settings
5. Deploy!

### Option 2: Heroku
- Free tier (limited)
- Good for full-stack apps

**Setup:**
1. Install Heroku CLI
2. `heroku login`
3. `heroku create galagadi-backend`
4. Set env vars: `heroku config:set EMAIL_USER=...`
5. `git push heroku main`

### Option 3: Railway.app
- $5/month free tier
- Simple deployment

### Option 4: Render
- Free tier with limitations
- Easy to deploy

---

## Production Checklist

- [ ] Email service configured and tested
- [ ] Backend deployed to production
- [ ] Frontend API_URL updated to production backend
- [ ] CORS properly configured
- [ ] SSL/HTTPS enabled
- [ ] Database backup plan (when added)
- [ ] Error monitoring setup
- [ ] Email templates reviewed
- [ ] Test form submissions end-to-end

---

## Troubleshooting

### Forms not submitting?
1. Check backend is running: `http://localhost:5000/api/health`
2. Check console (F12) for errors
3. Check CORS settings in backend
4. Verify email configuration in `.env`

### Emails not being sent?
1. Check `.env` EMAIL_USER and EMAIL_PASS
2. If Gmail, verify app-specific password
3. Check backend logs for email errors
4. Enable "Less secure apps" if using regular Gmail password

### Port 5000 already in use?
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

---

## Next Steps

### Phase 1 (Current)
- ✅ Basic contact/booking forms
- ✅ Email notifications
- ✅ Form validation

### Phase 2 (Optional)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User accounts
- [ ] Booking history
- [ ] Admin dashboard

### Phase 3 (Optional)
- [ ] Payment processing (Stripe)
- [ ] Invoice generation
- [ ] SMS notifications
- [ ] Analytics

---

## Support Resources

- Express.js Docs: https://expressjs.com/
- Nodemailer Docs: https://nodemailer.com/
- Vercel Docs: https://vercel.com/docs
- Node.js: https://nodejs.org/

---

## Important Security Notes

1. **Never commit `.env` file** - it's in `.gitignore`
2. **Use environment variables** for all secrets
3. **Validate all inputs** on backend (done with express-validator)
4. **Use HTTPS in production**
5. **Set strong CORS restrictions**
6. **Keep dependencies updated**: `npm update`

---

**Need help?** Check backend logs or frontend console (F12) for detailed error messages.
