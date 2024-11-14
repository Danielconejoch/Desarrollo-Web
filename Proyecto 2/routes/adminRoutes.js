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

// Rutas de Publicaciones
router.get('/posts', ensureAuthenticated, checkAdmin, adminController.listPosts);
router.get('/posts/create', ensureAuthenticated, checkAdmin, adminController.createPostForm);
router.post('/posts/create', ensureAuthenticated, checkAdmin, adminController.createPost);
router.get('/posts/edit/:id', ensureAuthenticated, checkAdmin, adminController.editPostForm);
router.post('/posts/edit/:id', ensureAuthenticated, checkAdmin, adminController.updatePost);
router.post('/posts/delete/:id', ensureAuthenticated, checkAdmin, adminController.deletePost);
router.get('/posts/category/:categoryId', ensureAuthenticated, checkAdmin, adminController.filterPostsByCategory);
router.get('/posts/author/:authorUsername', ensureAuthenticated, checkAdmin, adminController.filterPostsByAuthor);

// Rutas de Comentarios
router.post('/comments/create', ensureAuthenticated, checkAdmin, adminController.createComment);
router.post('/comments/:id/edit', ensureAuthenticated, checkAdmin, adminController.editComment);
router.post('/comments/:id/update', ensureAuthenticated, checkAdmin,adminController.updateComment);
router.post('/comments/:id/delete', ensureAuthenticated, checkAdmin, adminController.deleteComment);

module.exports = router;
