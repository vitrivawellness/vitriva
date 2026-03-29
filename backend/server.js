const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());

// JSON parsing for standard API routes
app.use(express.json());

// Serve uploads locally
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));

// Basic health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', ts: new Date() });
});

// Serve frontend in production (Only if explicitly enabled or files exist)
if (process.env.SERVE_FRONTEND === 'true' || process.env.NODE_ENV === 'serve_static') {
    const distPath = path.join(__dirname, '../shop-swiftly/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
    });
} else {
    // Default success message for backend root URL
    app.get('/', (req, res) => {
        res.status(200).json({ 
            message: 'Vitriva API is running!', 
            status: 'OK',
            timestamp: new Date().toISOString()
        });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
