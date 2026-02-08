const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authenticate, authorize(['ADMIN']), getAnalytics);

module.exports = router;