// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/dashboard', ensureAuthenticated, checkAdmin, adminController.dashboard);
router.get('/users', ensureAuthenticated, checkAdmin, adminController.listUsers);
router.get('/users/create', ensureAuthenticated, checkAdmin, adminController.createUserForm);
router.post('/users', ensureAuthenticated, checkAdmin, adminController.createUser);
router.get('/users/:id/edit', ensureAuthenticated, checkAdmin, adminController.editUserForm);
router.post('/users/edit/:username', ensureAuthenticated, checkAdmin, adminController.updateUser);
router.post('/users/delete/:username', ensureAuthenticated, checkAdmin, adminController.deleteUser);

module.exports = router;
