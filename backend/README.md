# Galagadi Tours & Safari - Backend API

This is the Node.js + Express backend for the Galagadi Tours & Safari website.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your settings:

```bash
cp .env.example .env
```

### 3. Email Configuration (Gmail Example)

1. Go to https://myaccount.google.com/apppasswords
2. Generate an app-specific password for Gmail
3. Add to `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Contact Form
- **POST** `/api/contact`
- Handles contact inquiries from the Contact page
- Fields: `name`, `email`, `phone` (optional), `message`

### Booking Form
- **POST** `/api/booking`
- Handles safari package bookings
- Fields: `name`, `email`, `phone`, `packageType`, `preferredDates`, `travelers`, `budget` (optional), `message`

### Health Check
- **GET** `/api/health`
- Returns server status

## Project Structure

```
backend/
├── config/          # Configuration files (email)
├── controllers/     # Business logic for routes
├── routes/          # API route definitions
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json
├── .env.example
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `EMAIL_SERVICE` - Email service provider (gmail)
- `EMAIL_USER` - Email account for sending
- `EMAIL_PASS` - Email password/app-password
- `CONTACT_EMAIL` - Admin email to receive inquiries
- `FRONTEND_URL` - Frontend URL for CORS

## Frontend Integration

The frontend should send POST requests to:
- `http://localhost:5000/api/contact` (Contact form)
- `http://localhost:5000/api/booking` (Booking form)

## Deployment

Ready to deploy to:
- Vercel
- Heroku
- AWS Lambda
- Any Node.js hosting

See deployment-specific docs for your chosen platform.
