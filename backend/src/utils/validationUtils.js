const { body, param, query, validationResult } = require('express-validator');

// Custom validation for issue creation
const validateIssueCreation = [
  body('title').isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['PLUMBING', 'ELECTRICAL', 'INTERNET', 'CLEANLINESS', 'FURNITURE', 'OTHER']).withMessage('Invalid category'),
  body('priority').isIn(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']).withMessage('Invalid priority'),
  body('visibility').optional().isIn(['PUBLIC', 'PRIVATE']).withMessage('Invalid visibility'),
];

// Custom validation for announcement creation
const validateAnnouncementCreation = [
  body('title').isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),
  body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('targetHostel').optional().isString(),
  body('targetBlock').optional().isString(),
  body('targetRole').optional().isIn(['STUDENT', 'ADMIN']).withMessage('Invalid target role'),
];

// Custom validation for lost/found creation
const validateLostAndFoundCreation = [
  body('itemName').isLength({ min: 2, max: 50 }).withMessage('Item name must be 2-50 characters'),
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
  body('location').isLength({ min: 2 }).withMessage('Location must be at least 2 characters'),
  body('date').isISO8601().withMessage('Invalid date format'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateIssueCreation,
  validateAnnouncementCreation,
  validateLostAndFoundCreation,
  handleValidationErrors,
};