const express = require('express');
const { body, param } = require('express-validator');
const {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientHistory,
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'doctor', 'receptionist'), getPatients);

router.post(
  '/',
  authorize('admin', 'receptionist'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('age').isInt({ min: 0, max: 130 }).withMessage('Age must be between 0 and 130'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('medicalHistory').optional().isString(),
  ],
  validateRequest,
  createPatient
);

router.put(
  '/:id',
  authorize('admin', 'receptionist'),
  [param('id').isMongoId().withMessage('Invalid patient id')],
  validateRequest,
  updatePatient
);

router.delete(
  '/:id',
  authorize('admin'),
  [param('id').isMongoId().withMessage('Invalid patient id')],
  validateRequest,
  deletePatient
);

router.get(
  '/:id/history',
  authorize('admin', 'doctor', 'receptionist'),
  [param('id').isMongoId().withMessage('Invalid patient id')],
  validateRequest,
  getPatientHistory
);

module.exports = router;
