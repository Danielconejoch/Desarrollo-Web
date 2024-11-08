const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/commentController');

router.post('/create', CommentsController.create);

router.post('/:id/delete', CommentsController.destroy);

router.post('/:id/edit', CommentsController.edit);

router.post('/:id/update', CommentsController.update);

module.exports = router;
