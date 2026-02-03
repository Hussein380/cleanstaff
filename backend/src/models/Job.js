const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    location: { type: String, required: true }, // Specific area, e.g., 'Floor 5, Suite 400'
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'Urgent'],
        default: 'Not Started'
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
    startTime: { type: Date },
    endTime: { type: Date },
    checklist: [{
        task: { type: String },
        isCompleted: { type: Boolean, default: false }
    }],
    completionPercentage: { type: Number, default: 0 },
    assignedStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }],
    images: [{ type: String }], // Cloudinary URLs for "After" photos
    inspectionScore: { type: Number },
    clientFeedback: {
        rating: { type: Number },
        comment: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
