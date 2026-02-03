const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

const upload = require('../middleware/upload');

router.get('/', staffController.getAllStaff);
router.patch('/:id/status', staffController.updateStaffStatus);
router.patch('/:id/avatar', upload.single('avatar'), staffController.updateAvatar);

module.exports = router;
