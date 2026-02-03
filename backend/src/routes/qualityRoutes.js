const express = require('express');
const router = express.Router();
const qualityController = require('../controllers/qualityController');

const upload = require('../middleware/upload');

router.get('/stats', qualityController.getQualityStats);
router.post('/submit', upload.array('images', 5), qualityController.submitInspection);

module.exports = router;
