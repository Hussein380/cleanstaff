const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

router.get('/', authMiddleware.restrictTo('admin', 'staff', 'client'), jobController.getJobs);
router.get('/:id', authMiddleware.restrictTo('admin', 'staff', 'client'), jobController.getJobById);
router.post('/', authMiddleware.restrictTo('admin', 'client'), jobController.createJob);
router.put('/:id', authMiddleware.restrictTo('admin'), jobController.updateJob);
router.patch('/:id/status', authMiddleware.restrictTo('admin', 'staff'), jobController.updateJobStatus);
router.delete('/:id', authMiddleware.restrictTo('admin'), jobController.deleteJob);

module.exports = router;
