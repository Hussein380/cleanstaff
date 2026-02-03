const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', dashboardController.getSummary);
router.get('/priority-jobs', dashboardController.getHighPriorityCleanings);

module.exports = router;
