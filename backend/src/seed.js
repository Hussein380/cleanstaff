const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Staff = require('./models/Staff');
const Client = require('./models/Client');
const Job = require('./models/Job');
const Inventory = require('./models/Inventory');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected for seeding');
        seedData();
    })
    .catch(err => {
        console.error('Initial connection error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        await Staff.deleteMany({});
        await Client.deleteMany({});
        await Job.deleteMany({});
        await Inventory.deleteMany({});

        // Create Staff
        const staff = await Staff.create([
            { name: 'Sarah Jenkins', role: 'Senior Cleaner', status: 'Active' },
            { name: 'Marcus Chen', role: 'Floor Specialist', status: 'On Break' },
            { name: 'Elena Rodriguez', role: 'General Staff', status: 'Scheduled' }
        ]);

        // Create Clients
        const client = await Client.create({
            companyName: 'Grand Plaza Hotel',
            name: 'Manager',
            email: 'manager@grandplaza.com',
            locations: [{ name: 'BB Waterfront Blvd', address: '123 Coast St', facilityType: 'Hotel' }]
        });

        // Create Jobs
        await Job.create([
            {
                title: 'Deep Cleaning - 10:00 PM',
                client: client._id,
                location: 'Grand Plaza Hotel',
                status: 'In Progress',
                priority: 'High',
                completionPercentage: 65,
                assignedStaff: [staff[0]._id]
            },
            {
                title: 'Weekly Maintenance',
                client: client._id,
                location: 'TechCorp Headquarters',
                status: 'Not Started',
                priority: 'Medium'
            },
            {
                title: 'Emergency Sanitization',
                client: client._id,
                location: 'Saint Jude\'s School',
                status: 'Urgent',
                priority: 'Urgent'
            }
        ]);

        // Create Inventory
        await Inventory.create([
            { name: 'Glass Cleaner (5L)', category: 'Chemicals', site: 'Apartment Complex A', currentStock: 2, threshold: 5 },
            { name: 'Microfiber Towels', category: 'Equipment', site: 'School B', currentStock: 5, threshold: 10 }
        ]);

        console.log('Seeding complete!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};


// seedData();
