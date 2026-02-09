const Job = require('../models/Job');
const Client = require('../models/Client');
const Staff = require('../models/Staff');

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

const getClientAndStaffIds = async (data) => {
    const { companyName, address, staffNames } = data;

    // 1. Handle Client
    let client;
    if (companyName) {
        client = await Client.findOne({ companyName });
        if (!client) {
            client = new Client({
                companyName,
                name: 'Contact Person', // Placeholder
                email: `${companyName.replace(/\s+/g, '').toLowerCase()}@example.com`, // Placeholder
                locations: [{ address, facilityType: 'Office', name: 'Main' }]
            });
            await client.save();
        }
    }

    // 2. Handle Staff
    const assignedStaff = [];
    if (staffNames && Array.isArray(staffNames)) {
        for (const name of staffNames) {
            let member = await Staff.findOne({ name });
            if (!member) {
                member = new Staff({
                    name,
                    role: 'Cleaner', // Placeholder
                    status: 'Active'
                });
                await member.save();
            }
            assignedStaff.push(member._id);
        }
    }

    return { clientId: client?._id, staffIds: assignedStaff };
};

exports.createJob = async (req, res) => {
    try {
        const { clientId, staffIds } = await getClientAndStaffIds(req.body);

        const job = new Job({
            title: req.body.title,
            location: req.body.location || req.body.address,
            priority: req.body.priority,
            status: req.body.status,
            client: clientId,
            assignedStaff: staffIds
        });

        await job.save();
        res.status(201).json(await job.populate('client assignedStaff'));
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

exports.updateJob = async (req, res) => {
    try {
        const { clientId, staffIds } = await getClientAndStaffIds(req.body);

        const updateData = {
            title: req.body.title,
            location: req.body.location || req.body.address,
            priority: req.body.priority,
            status: req.body.status,
            client: clientId,
            assignedStaff: staffIds,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        };

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('client assignedStaff');

        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
