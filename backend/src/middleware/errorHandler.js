/**
 * Global Error Handler Middleware
 * 
 * This catches all errors thrown in async routes.
 * It sends a consistent JSON response format.
 */

const sendError = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
    });
};

// The main middleware function Express will use
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    sendError(err, res);
};
