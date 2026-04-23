const express = require('express');
const multer = require('multer');
const { body, param } = require('express-validator');
const { storage } = require('../config/cloudinary');
const {
  createMedicalRecord,
  getMedicalRecordsByPatient,
} = require('../controllers/medicalRecordController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');

const upload = multer({ storage });
const router = express.Router();

router.use(protect);

router.post(
  '/',
  authorize('admin', 'doctor'),
  upload.single('reportFile'),
  [
    body('patientId').isMongoId().withMessage('Valid patientId is required'),
    body('doctorId').isMongoId().withMessage('Valid doctorId is required'),
    body('diagnosis').trim().notEmpty().withMessage('Diagnosis is required'),
    body('notes').optional().isString(),
  ],
  validateRequest,
  createMedicalRecord
);

router.get(
  '/:patientId',
  authorize('admin', 'doctor', 'receptionist'),
  [param('patientId').isMongoId().withMessage('Invalid patient ID')],
  validateRequest,
  getMedicalRecordsByPatient
);

module.exports = router;
