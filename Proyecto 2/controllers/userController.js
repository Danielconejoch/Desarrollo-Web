const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.render('users/index', { title: 'Usuarios', users });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('users/create', { title: 'Agregar Usuario', errors: errors.array() });
    }

    if (req.method === 'POST') {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
        await User.create({ ...req.body, password: hashedPassword }); // Save the user with hashed password
        res.redirect('/users');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.render('users/create', { title: 'Agregar Usuario' });
    }
  }

  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('users/update', { title: 'Editar Usuario', errors: errors.array() });
    }

    if (req.method === 'POST') {
      try {
        // Only hash password if it's being changed
        const userUpdates = { ...req.body };
        if (req.body.password) {
          userUpdates.password = await bcrypt.hash(req.body.password, 10); // Hash new password
        }

        await User.update(userUpdates, { where: { username: req.params.username } });
        res.redirect('/users');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const user = await User.findByPk(req.params.username);
      res.render('users/update', { title: 'Editar Usuario', user });
    }
  }

  async delete(req, res) {
    try {
      await User.destroy({ where: { username: req.params.username } });
      res.redirect('/users');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new UserController();
