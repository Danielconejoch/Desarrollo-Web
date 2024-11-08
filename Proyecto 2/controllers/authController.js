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
    return res.status(400).json({ errors: errors.array() }); // Manejar errores de validación
  }

  const { username, password } = req.body; // Cambiar 'email' a 'username'

  try {
    const user = await User.findOne({ where: { username } }); // Buscar por username

    if (user) {
      const isPasswordValid = password === user.password; // Comparar sin bcrypt

      if (isPasswordValid) {
        req.session.username = user.username; // Almacenar username en la sesión
        return res.redirect('/dashboard'); // Redirigir al dashboard
      }
    }

    // Si llega aquí, las credenciales son inválidas
    res.status(401).send('Credenciales inválidas'); // Manejo de credenciales inválidas
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Loguear el error
    res.status(500).send('Ocurrió un error al iniciar sesión.'); // Mensaje de error
  }
};


// Logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => { // Destroy session
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada correctamente' });
  });
};
