const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { apiLimiter, authLimiter } = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;

module.exports = app;

// Database Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.error(err);
    });

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Body limit

// Security Headers
app.use(helmet());

// Apply rate limiting to API
app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/quality', require('./routes/qualityRoutes'));
app.use('/api/client', require('./routes/clientRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CleanStaff API' });
});

// Global Error Handler - MUST be at the end, after all routes
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
