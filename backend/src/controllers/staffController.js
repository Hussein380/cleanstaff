const Staff = require('../models/Staff');

const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
