const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., 'Senior Cleaner', 'Floor Specialist'
    status: {
        type: String,
        enum: ['Active', 'On Break', 'Scheduled', 'Offline'],
        default: 'Offline'
    },
    rating: { type: Number, default: 5.0 },
    avatar: { type: String }, // Cloudinary URL
    phone: { type: String },
    email: { type: String },
    lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
