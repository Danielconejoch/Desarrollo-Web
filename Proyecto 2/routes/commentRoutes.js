const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Listar todos los comentarios
router.get('/', commentController.index.bind(commentController));

// Formulario de creación y acción de creación
router.get('/create', commentController.create.bind(commentController));
router.post('/create', commentController.create.bind(commentController));

// Formulario de edición y acción de actualización
router.get('/update/:id', commentController.update.bind(commentController));
router.post('/update/:id', commentController.update.bind(commentController));

// Acción para eliminar un comentario
router.get('/delete/:id', commentController.delete.bind(commentController));

module.exports = router;
