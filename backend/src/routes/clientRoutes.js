const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/dashboard', clientController.getClientDashboard);
router.post('/book', clientController.requestBooking);

module.exports = router;
