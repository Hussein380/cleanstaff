const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
    try {
        const { status, priority } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const jobs = await Job.find(filter).populate('client assignedStaff');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('client assignedStaff');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateJobStatus = async (req, res) => {
    try {
        const { status, completionPercentage, checklist } = req.body;
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { status, completionPercentage, checklist },
            { new: true }
        );
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
