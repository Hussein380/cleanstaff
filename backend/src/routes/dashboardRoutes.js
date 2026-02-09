const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.get('/summary', dashboardController.getSummary);
router.get('/priority-jobs', dashboardController.getHighPriorityCleanings);

module.exports = router;
