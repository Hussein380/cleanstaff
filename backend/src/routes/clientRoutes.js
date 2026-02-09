const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

const authMiddleware = require('../middleware/authMiddleware');

// Admin-only route (must be before restrictTo('client'))
router.get('/all', authMiddleware.protect, authMiddleware.restrictTo('admin'), clientController.getAllClients);
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), clientController.createClient);
router.put('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), clientController.updateClient);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), clientController.deleteClient);

// Client-only routes
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('client'));

router.get('/dashboard', clientController.getClientDashboard);
router.post('/book', clientController.requestBooking);

module.exports = router;
