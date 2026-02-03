const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    location: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Scheduled', 'Active', 'On Break', 'Completed', 'Unassigned'],
        default: 'Scheduled'
    },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);
