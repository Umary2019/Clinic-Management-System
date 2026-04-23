const express = require('express');
const { body, param } = require('express-validator');
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  authorize('admin', 'receptionist'),
  [
    body('patientId').isMongoId().withMessage('Valid patientId is required'),
    body('doctorId').isMongoId().withMessage('Valid doctorId is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('status').optional().isIn(['pending', 'approved', 'completed', 'cancelled']),
  ],
  validateRequest,
  createAppointment
);

router.get('/', authorize('admin', 'doctor', 'receptionist'), getAppointments);

router.patch(
  '/:id/status',
  authorize('admin', 'doctor', 'receptionist'),
  [
    param('id').isMongoId().withMessage('Invalid appointment ID'),
    body('status')
      .isIn(['pending', 'approved', 'completed', 'cancelled'])
      .withMessage('Invalid appointment status'),
  ],
  validateRequest,
  updateAppointmentStatus
);

module.exports = router;
