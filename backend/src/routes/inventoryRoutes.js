const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.patch('/:id/stock', inventoryController.updateStock);

module.exports = router;
