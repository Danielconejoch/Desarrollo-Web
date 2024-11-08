const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Listar todos los usuarios
router.get('/', userController.index.bind(userController));

// Formulario de creación y acción de creación
router.get('/create', userController.create.bind(userController));
router.post('/create', userController.create.bind(userController));

// Formulario de edición y acción de actualización
router.get('/update/:username', userController.update.bind(userController));
router.post('/update/:username', userController.update.bind(userController));

// Acción para eliminar un usuario
router.get('/delete/:username', userController.delete.bind(userController));

module.exports = router;
