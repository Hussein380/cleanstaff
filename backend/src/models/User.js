const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false // Never return password by default
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'client'],
        default: 'client'
    },
    // Link to the specific profile (Staff document or Client document)
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'profileModel'
    },
    profileModel: {
        type: String,
        required: true,
        enum: ['Staff', 'Client', 'Admin'], // Admin might not have a separate profile doc, or self-ref
        default: 'Client'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
});

// Method to verify password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
