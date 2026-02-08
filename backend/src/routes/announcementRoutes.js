const express = require('express');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

// Create announcement (Admin only)
router.post('/', authenticate, authorize(['ADMIN']), createAnnouncement);

// Get announcements (Authenticated users, filtered by user context)
router.get('/', authenticate, getAnnouncements);

module.exports = router;