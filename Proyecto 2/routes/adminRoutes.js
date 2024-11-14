// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// Users
router.get('/dashboard', ensureAuthenticated, checkAdmin, adminController.dashboard);
router.get('/users', ensureAuthenticated, checkAdmin, adminController.listUsers);
router.get('/users/create', ensureAuthenticated, checkAdmin, adminController.createUserForm);
router.post('/users', ensureAuthenticated, checkAdmin, adminController.createUser);
router.get('/users/:id/edit', ensureAuthenticated, checkAdmin, adminController.editUserForm);
router.post('/users/edit/:username', ensureAuthenticated, checkAdmin, adminController.updateUser);
router.post('/users/delete/:username', ensureAuthenticated, checkAdmin, adminController.deleteUser);

// Categories
router.get('/categories', ensureAuthenticated, checkAdmin, adminController.listCategories);
router.get('/categories/create', ensureAuthenticated, checkAdmin, adminController.createCategoryForm);
router.post('/categories', ensureAuthenticated, checkAdmin, adminController.createCategory);
router.get('/categories/:id/edit', ensureAuthenticated, checkAdmin, adminController.editCategoryForm);
router.post('/categories/:id', ensureAuthenticated, checkAdmin, adminController.updateCategory);
router.post('/categories/:id/delete', ensureAuthenticated, checkAdmin, adminController.deleteCategory);

module.exports = router;
