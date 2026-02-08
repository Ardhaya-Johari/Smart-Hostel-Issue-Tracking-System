const express = require('express');
const { addComment, deleteComment } = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authenticate, addComment);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteComment);

module.exports = router;