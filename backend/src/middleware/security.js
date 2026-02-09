const rateLimit = require('express-rate-limit');

// General API Rate Limiting
exports.apiLimiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per 15 mins
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in 15 minutes!'
});

// Stricter Rate Limiting for Auth
exports.authLimiter = rateLimit({
    max: 10, // Limit login attempts to 10 per hour
    windowMs: 60 * 60 * 1000,
    message: 'Too many login attempts from this IP, please try again in an hour'
});
