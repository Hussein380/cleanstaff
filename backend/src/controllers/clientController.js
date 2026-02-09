const Client = require('../models/Client');
const Job = require('../models/Job');

/**
 * Optimized getAllClients using MongoDB Aggregation Pipeline.
 *
 * Before: For each client, we ran 1 extra query to get their jobs/stats.
 *         With 50 clients, that was 50+ database calls. SLOW!
 *
 * After:  A single aggregation query joins clients and jobs, and
 *         calculates stats (activeJobs, assignedStaff) in the database.
 *         Only 1 database call. FAST!
 */
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.aggregate([
            // Stage 1: Look up all jobs for each client
            {
                $lookup: {
                    from: 'jobs', // The MongoDB collection name (lowercase, plural)
                    localField: '_id',
                    foreignField: 'client',
                    as: 'jobs'
                }
            },
            // Stage 2: Calculate stats for each client
            {
                $addFields: {
                    stats: {
                        totalJobs: { $size: '$jobs' },
                        activeJobs: {
                            $size: {
                                $filter: {
                                    input: '$jobs',
                                    as: 'job',
                                    cond: { $in: ['$$job.status', ['Not Started', 'In Progress', 'Urgent']] }
                                }
                            }
                        },
                        assignedStaff: {
                            $size: {
                                $reduce: {
                                    input: {
                                        $filter: {
                                            input: '$jobs',
                                            as: 'job',
                                            cond: { $in: ['$$job.status', ['Not Started', 'In Progress', 'Urgent']] }
                                        }
                                    },
                                    initialValue: [],
                                    in: { $setUnion: ['$$value', '$$this.assignedStaff'] }
                                }
                            }
                        }
                    }
                }
            },
            // Stage 3: Remove the raw jobs array (we don't need it in the response)
            {
                $project: { jobs: 0 }
            },
            // Stage 4: Sort by creation date
            {
                $sort: { createdAt: -1 }
            }
        ]);

        res.json(clients);
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
