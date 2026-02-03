const Client = require('../models/Client');
const Job = require('../models/Job');

exports.getClientDashboard = async (req, res) => {
    try {
        const client = await Client.findOne({ companyName: 'Grand Plaza Hotel' }); // Mocked auth
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const recentJobs = await Job.find({ client: client._id })
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            client,
            recentJobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.requestBooking = async (req, res) => {
    try {
        const { facilityType, serviceType, preferredDate, instructions } = req.body;
        // In a real app, we'd create a 'Booking' document or a 'Pending Job'
        const newJob = new Job({
            title: `${serviceType} - ${facilityType}`,
            client: req.body.clientId, // Should come from auth
            location: req.body.location,
            status: 'Not Started',
            priority: 'Medium',
            startTime: preferredDate,
            checklist: [{ task: 'Initial Inspection' }]
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
