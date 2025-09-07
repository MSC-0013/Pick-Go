const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const userRoutes = require("./routes/users");
const carRoutes = require("./routes/cars");


// Load environment variables
dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: [
    process.env.VERCEL_CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:8080'
  ],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());



// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

// Default route
app.get('/', (req, res) => res.send('API running'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
