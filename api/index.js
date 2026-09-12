const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// Route Imports
const userRoute = require('./routes/userRoute.js');
const authRoute = require('./routes/authRoute.js');
const listingRoute = require('./routes/listingRoute.js');

// Configuration
dotenv.config();

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

// Core Middlewares
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listings', listingRoute);

// Serve Frontend in Production (Express 5 Compatible)
const clientDistPath = path.resolve(__dirname, '..', 'clients', 'dist');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(clientDistPath));

  // In Express v5, use '{*splat}' or a catch-all middleware
  app.get('{*splat}', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});