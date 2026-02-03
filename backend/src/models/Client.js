const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Contact person or Manager name
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    locations: [{
        name: { type: String }, // e.g., 'TechTower Offices'
        address: { type: String },
        facilityType: { type: String, enum: ['Office', 'School', 'Apartment', 'Hotel'] }
    }],
    activePlan: {
        name: { type: String }, // e.g., 'Premium Facility Care'
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        renewalDate: { type: Date }
    }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
