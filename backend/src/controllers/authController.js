const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret-key-123', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Cookie options (if we decide to use cookies later)
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.register = async (req, res) => {
    try {
        // FIX: Only allow email and password.
        // Role is ALWAYS 'client' for public registration.
        // Admin roles must be assigned via DB or internal tool.
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        const newUser = await User.create({
            email,
            password,
            role: 'client', // Hardcoded for security
            profileModel: 'Client' // Hardcoded for security
        });

        createSendToken(newUser, 201, res);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // 3) If everything ok, send token
        createSendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMe = async (req, res, next) => {
    // User is already attached to req by protect middleware
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
};

exports.seedData = async (req, res) => {
    try {
        const User = require('../models/User');
        
        // Clear existing admin user if exists
        await User.deleteMany({ email: 'admin@cleanstaff.com' });
        
        // Create Admin User
        const admin = await User.create({
            email: 'admin@cleanstaff.com',
            password: 'password123',
            passwordConfirm: 'password123',
            role: 'admin',
            profileModel: 'Admin'
        });

        res.status(201).json({
            status: 'success',
            message: 'Admin user created successfully',
            data: {
                user: {
                    email: admin.email,
                    role: admin.role
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
