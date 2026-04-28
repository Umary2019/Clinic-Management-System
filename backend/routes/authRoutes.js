const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role')
      .optional()
      .isIn(['admin', 'doctor', 'receptionist', 'patient'])
      .withMessage('Invalid role'),
    body('gender')
      .if((value, { req }) => (req.body.role || 'patient') === 'patient')
      .isIn(['male', 'female'])
      .withMessage('Gender is required for patient registration'),
    body('age')
      .if((value, { req }) => (req.body.role || 'patient') === 'patient')
      .isInt({ min: 0, max: 130 })
      .withMessage('Age must be between 0 and 130'),
    body('phone')
      .if((value, { req }) => (req.body.role || 'patient') === 'patient')
      .trim()
      .notEmpty()
      .withMessage('Phone is required for patient registration'),
    body('address')
      .if((value, { req }) => (req.body.role || 'patient') === 'patient')
      .trim()
      .notEmpty()
      .withMessage('Address is required for patient registration'),
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
);

router.get('/profile', protect, authorize('admin', 'doctor', 'receptionist', 'patient'), getProfile);

module.exports = router;
