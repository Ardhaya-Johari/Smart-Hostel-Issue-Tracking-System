const express = require('express');
const { createLostAndFound, getLostAndFounds, claimItem, approveClaim } = require('../controllers/lostAndFoundController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Create lost/found item (Authenticated users)
router.post('/', authenticate, upload.array('media', 5), createLostAndFound);

// Get lost/found items (Authenticated users, filtered)
router.get('/', authenticate, getLostAndFounds);

// Claim an item (Authenticated users)
router.post('/:id/claim', authenticate, claimItem);

// Approve claim (Admin only)
router.put('/:id/approve', authenticate, authorize(['ADMIN']), approveClaim);

module.exports = router;