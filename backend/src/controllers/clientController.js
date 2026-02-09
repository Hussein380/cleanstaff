const Client = require('../models/Client');
const Job = require('../models/Job');

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.lean().find().sort({ createdAt: -1 });

        // Aggregate stats for each client
        const clientsWithStats = await Promise.all(clients.map(async (client) => {
            const jobs = await Job.find({ client: client._id }).select('status assignedStaff');

            // Active Jobs: Not Started or In Progress
            const activeJobsCount = jobs.filter(j => ['Not Started', 'In Progress', 'Urgent'].includes(j.status)).length;

            // Unique Staff Assigned to Active Jobs
            const staffSet = new Set();
            jobs.forEach(j => {
                if (['Not Started', 'In Progress', 'Urgent'].includes(j.status)) {
                    j.assignedStaff.forEach(s => staffSet.add(s.toString()));
                }
            });

            return {
                ...client,
                stats: {
                    activeJobs: activeJobsCount,
                    assignedStaff: staffSet.size,
                    totalJobs: jobs.length
                }
            };
        }));

        res.json(clientsWithStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createClient = async (req, res) => {
    try {
        const { companyName, name, email, phone, address, facilityType } = req.body;
        const newClient = new Client({
            companyName,
            name,
            email,
            phone,
            locations: [{ address, facilityType, name: 'Main Location' }]
        });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const { companyName, name, email, phone, address, facilityType } = req.body;
        // Simple update logic - in a real app might handle locations array more robustly
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            {
                companyName,
                name,
                email,
                phone,
                // Update the first location for simplicity in this MVP
                $set: { "locations.0.address": address, "locations.0.facilityType": facilityType }
            },
            { new: true, runValidators: true }
        );
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        // Optional: cleanup jobs associated with client
        // await Job.deleteMany({ client: req.params.id }); 
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
