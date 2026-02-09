const Staff = require('../models/Staff');

const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find().sort({ createdAt: -1 });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        const { name, role, email, phone, status } = req.body;
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            { name, role, email, phone, status, lastActive: Date.now() },
            { new: true, runValidators: true }
        );
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateStaffStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            { status, lastActive: Date.now() },
            { new: true }
        );
        res.json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await uploadToCloudinary(req.file.path, 'staff_avatars');
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            { avatar: result.url },
            { new: true }
        );
        res.json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
