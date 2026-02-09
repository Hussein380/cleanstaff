const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin', 'staff'));

router.get('/', inventoryController.getInventory);
router.patch('/:id/stock', inventoryController.updateStock);

module.exports = router;
