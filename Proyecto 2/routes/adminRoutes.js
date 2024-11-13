// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/dashboard', ensureAuthenticated, checkAdmin, adminController.dashboard);

module.exports = router;
