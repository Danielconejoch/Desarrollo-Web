const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Listar todas las categorías
router.get('/', categoryController.index.bind(categoryController));

// Formulario de creación y acción de creación
router.get('/create', categoryController.create.bind(categoryController));
router.post('/create', categoryController.create.bind(categoryController));

// Formulario de edición y acción de actualización
router.get('/update/:id', categoryController.update.bind(categoryController));
router.post('/update/:id', categoryController.update.bind(categoryController));

// Acción para eliminar una categoría
router.get('/delete/:id', categoryController.delete.bind(categoryController));

module.exports = router;
