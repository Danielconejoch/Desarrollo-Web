const { User } = require('../models');

exports.dashboard = (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard', username: req.session.username });
};

// Users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('admin/users', { title: 'Manage Users', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};

exports.createUserForm = (req, res) => {
  res.render('admin/createUser', { title: 'Create New User' });
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log('Creating user with data:', { username, email, password, role });
    await User.create({ username, email, password, role });
    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.render('admin/editUser', { title: 'Edit User', user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error fetching user');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const { email, role } = req.body;

    await User.update(
      { email, role },
      { where: { username } }
    );

    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    await User.destroy({ where: { username } });
    res.redirect('/admin/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};