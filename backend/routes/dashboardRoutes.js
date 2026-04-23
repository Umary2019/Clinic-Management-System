const express = require('express');
const {
  getAdminDashboard,
  getDoctorDashboard,
  getReceptionistDashboard,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);
router.get('/admin', authorize('admin'), getAdminDashboard);
router.get('/doctor', authorize('admin', 'doctor'), getDoctorDashboard);
router.get('/receptionist', authorize('admin', 'receptionist'), getReceptionistDashboard);

module.exports = router;
