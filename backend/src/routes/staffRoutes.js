const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

const upload = require('../middleware/upload');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin', 'staff'));

router.get('/', staffController.getAllStaff);
router.post('/', authMiddleware.restrictTo('admin'), staffController.createStaff);
router.put('/:id', authMiddleware.restrictTo('admin'), staffController.updateStaff);
router.delete('/:id', authMiddleware.restrictTo('admin'), staffController.deleteStaff);
router.patch('/:id/status', staffController.updateStaffStatus);
router.patch('/:id/avatar', upload.single('avatar'), staffController.updateAvatar);

module.exports = router;
