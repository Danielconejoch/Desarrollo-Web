const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentController');

// Route to handle creating a new comment on a post
router.post('/create', CommentsController.create);

router.post('/:id/delete', CommentsController.destroy);

module.exports = router;
