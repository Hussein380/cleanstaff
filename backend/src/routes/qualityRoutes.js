const express = require('express');
const router = express.Router();
const qualityController = require('../controllers/qualityController');

const upload = require('../middleware/upload');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

router.get('/stats', authMiddleware.restrictTo('admin'), qualityController.getQualityStats);
router.post('/submit', authMiddleware.restrictTo('admin', 'staff'), upload.array('images', 5), qualityController.submitInspection);

module.exports = router;
