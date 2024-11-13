const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role: 'autor' });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user.password === password) {
      console.log('User role:', user.role);
      req.session.username = user.username;
      req.session.role = user.role;
      return user.role === 'administrador' 
        ? res.redirect('/admin/dashboard') 
        : res.redirect('/dashboard');
    }

    res.status(401).send('Credenciales inválidas');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Ocurrió un error al iniciar sesión.');
  }
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); // Borrar la cookie de sesión
    res.redirect('/auth/login'); // Redirigir a la página de inicio de sesión
  });
};
