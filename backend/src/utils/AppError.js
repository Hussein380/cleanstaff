/**
 * AppError - A custom error class for operational errors.
 * 
 * Use this to throw errors that should be returned to the user (e.g., "Not Found").
 * These are different from programming bugs, which should crash the app.
 * 
 * @example
 * throw new AppError('Job not found', 404);
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Marks this as a "safe" error to show to users

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
