const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { currentStock } = req.body;
        const item = await Inventory.findByIdAndUpdate(
            req.params.id,
            { currentStock },
            { new: true }
        );
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
