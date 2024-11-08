const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
  res.render('auth/auth', { title: 'Login' });
});

// Render registration page
router.get('/register', (req, res) => {
  res.render('auth/auth', { title: 'Register' });
});

// Registration route
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('Ingrese un correo válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  register
);

// Login route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'), // Cambiar 'email' a 'username'
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  login
);


// Logout route
router.post('/logout', logout);

module.exports = router;
