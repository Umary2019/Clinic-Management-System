const express = require('express');
const { body } = require('express-validator');
const { getDoctors, createDoctor } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'doctor', 'receptionist'), getDoctors);

router.post(
  '/',
  authorize('admin'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('specialization').trim().notEmpty().withMessage('Specialization is required'),
    body('availability').optional().isArray().withMessage('Availability must be an array'),
    body('userId').optional().isMongoId().withMessage('Invalid linked user ID'),
  ],
  validateRequest,
  createDoctor
);

module.exports = router;
