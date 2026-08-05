const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const configuredFrontendOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// ============================================
// STEP 1: SECURITY HEADERS (Helmet; supports comma-separated FRONTEND_URL)
// ============================================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      // FRONTEND_URL may contain a comma-separated allow-list. Helmet needs
      // each CSP source as a separate value, not the whole string.
      connectSrc: ["'self'", ...configuredFrontendOrigins, 'http://localhost:3000']
    }
  },
  crossOriginEmbedderPolicy: false
}));

// ============================================
// STEP 2: COMPRESSION
// ============================================
app.use(compression());

// ============================================
// STEP 3: LOGGING (Morgan)
// ============================================
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// ============================================
// STEP 4: CORS CONFIGURATION
// ============================================
const allowedOrigins = [...configuredFrontendOrigins];

const defaultOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

defaultOrigins.forEach((origin) => {
  if (!allowedOrigins.includes(origin)) allowedOrigins.push(origin);
});

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.startsWith('*.')) {
        const domain = allowed.replace('*.', '');
        return origin.endsWith(domain);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  maxAge: 86400
}));

// ============================================
// STEP 5: BODY PARSERS
// ============================================
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// STEP 6: GLOBAL RATE LIMITING
// ============================================
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health'
});

app.use('/api', globalRateLimiter);

// ============================================
// STEP 7: REQUEST LOGGING MIDDLEWARE
// ============================================
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// ============================================
// STEP 8: SECURITY HEADERS (Custom)
// ============================================
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// ============================================
// STEP 9: ROUTES
// ============================================
// Import routes
const contactRoutes = require('./routes/contact');
const bookingRoutes = require('./routes/booking');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version,
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);

// ============================================
// STEP 10: 404 HANDLER
// ============================================
app.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// STEP 11: ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  console.error('Server Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal server error' : err.message,
    ...(isDevelopment && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// STEP 12: UNHANDLED REJECTION HANDLER
// ============================================
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  if (process.env.NODE_ENV === 'production') {
    const errorLog = path.join(logDir, 'fatal-errors.log');
    fs.appendFileSync(errorLog, 
      `[${new Date().toISOString()}] Uncaught Exception: ${error.stack}\n`
    );
  }
});

// ============================================
// STEP 13: START SERVER
// ============================================
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🦁 Galagadi Backend Server Running                      ║
║  📡 Port: ${PORT}                                          ║
║  🌍 Environment: ${process.env.NODE_ENV || 'development'}               ║
║  📧 Email: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Not Configured'} ║
║  🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'} ║
║  ⏰ Started: ${new Date().toLocaleString()}              ║
╚═══════════════════════════════════════════════════════════╝
  `);
  
  console.log('\n📋 Available Routes:');
  console.log('  GET  /api/health  - Health check');
  console.log('  POST /api/contact - Contact form submission');
  console.log('  POST /api/booking - Booking form submission');
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('\n⚠️  EMAIL NOT CONFIGURED:');
    console.log('  Add EMAIL_USER and EMAIL_PASS to .env file');
    console.log('  to enable email notifications.\n');
  } else {
    console.log('\n✅ Email notifications enabled!\n');
  }
});

// ============================================
// STEP 14: GRACEFUL SHUTDOWN
// ============================================
const gracefulShutdown = () => {
  console.log('\n🛑 Received shutdown signal. Closing server gracefully...');
  
  server.close(() => {
    console.log('✅ Server closed. Exiting process.');
    process.exit(0);
  });
  
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time. Forcing shutdown.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;
