require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dmRoutes = require('./routes/dm');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('chrome-extension://') || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dm', limiter, dmRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SlideInto backend API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Database connection & Server Startup
const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/slideinto';

async function connectWithFallback() {
  try {
    await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB database successfully.');
  } catch (err) {
    console.error('Failed to connect to primary MongoDB URI:', err.message);
    if (dbUri !== 'mongodb://127.0.0.1:27017/slideinto') {
      console.log('Attempting local MongoDB database fallback...');
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/slideinto', { serverSelectionTimeoutMS: 3000 });
        console.log('Connected to local MongoDB database successfully.');
      } catch (localErr) {
        console.error('Local MongoDB connection failed:', localErr.message);
        console.warn('WARNING: Running server without database connection! Database operations will fail.');
      }
    } else {
      console.warn('WARNING: Running server without database connection! Database operations will fail.');
    }
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

connectWithFallback();
