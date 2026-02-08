const express = require('express');
const { createIssue, getIssues, updateStatus, mergeIssues } = require('../controllers/issueController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', authenticate, upload.array('media', 5), createIssue);
router.get('/', authenticate, getIssues);
router.put('/:id/status', authenticate, authorize(['ADMIN']), updateStatus);
router.post('/merge', authenticate, authorize(['ADMIN']), mergeIssues);

module.exports = router;