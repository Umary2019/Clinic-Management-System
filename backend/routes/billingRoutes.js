const express = require('express');
const { body, param } = require('express-validator');
const { createBill, getBills, updateBillStatus } = require('../controllers/billingController');
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
    body('services').isArray({ min: 1 }).withMessage('At least one service is required'),
    body('services.*.title').trim().notEmpty().withMessage('Service title is required'),
    body('services.*.cost').isFloat({ min: 0 }).withMessage('Service cost must be >= 0'),
    body('status').optional().isIn(['paid', 'unpaid']),
  ],
  validateRequest,
  createBill
);

router.get('/', authorize('admin', 'receptionist'), getBills);

router.patch(
  '/:id/status',
  authorize('admin', 'receptionist'),
  [
    param('id').isMongoId().withMessage('Invalid billing ID'),
    body('status').isIn(['paid', 'unpaid']).withMessage('Invalid billing status'),
  ],
  validateRequest,
  updateBillStatus
);

module.exports = router;
