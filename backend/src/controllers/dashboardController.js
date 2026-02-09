const Job = require('../models/Job');
const Staff = require('../models/Staff');
const Shift = require('../models/Shift');
const Client = require('../models/Client');

exports.getSummary = async (req, res) => {
    try {
        const activeShifts = await Shift.countDocuments({ status: 'Active' });
        const pendingJobs = await Job.countDocuments({ status: 'Not Started' });
        const urgentJobs = await Job.countDocuments({ priority: 'Urgent', status: { $ne: 'Completed' } });
        const totalClients = await Client.countDocuments();

        res.json({
            activeShifts,
            pendingJobs,
            urgentJobs,
            totalClients,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHighPriorityCleanings = async (req, res) => {
    try {
        const jobs = await Job.find({
            priority: { $in: ['High', 'Urgent'] },
            status: { $ne: 'Completed' }
        })
            .populate('client')
            .sort({ startTime: 1 })
            .limit(5);

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
