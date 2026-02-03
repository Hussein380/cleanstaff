const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Chemicals', 'Equipment', 'Tools'], required: true },
    site: { type: String, required: true }, // e.g., 'Apartment Complex A'
    currentStock: { type: Number, required: true },
    unit: { type: String, default: 'units' }, // e.g., 'units', 'L'
    threshold: { type: Number, required: true }, // Low stock alert level
    status: {
        type: String,
        enum: ['In Stock', 'Low Stock', 'Out of Stock'],
        compute: function () {
            if (this.currentStock === 0) return 'Out of Stock';
            if (this.currentStock <= this.threshold) return 'Low Stock';
            return 'In Stock';
        }
    },
    imageUrl: { type: String } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
