const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to display the form to create a new post
router.get('/new', postController.create);

// Route to handle the submission of the new post form
router.post('/', postController.store);

// Route to display the edit form for an existing post
router.get('/:id/edit', postController.edit);

// Route to handle the submission of the edit form
router.post('/:id/update', postController.update);

router.post('/delete/:id', postController.destroy);

module.exports = router;
