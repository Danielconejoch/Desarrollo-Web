const express = require('express');
const { getProfilePosts } = require('../controllers/profileController');
const router = express.Router();

router.get('/', getProfilePosts);

module.exports = router;