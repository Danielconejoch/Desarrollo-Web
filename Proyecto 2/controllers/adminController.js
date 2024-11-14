const { User, Category, Post } = require('../models');

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

// Categories
exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('admin/categories', { title: 'Manage Categories', categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
};

exports.createCategoryForm = (req, res) => {
  res.render('admin/createCategory', { title: 'Create New Category' });
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).send("Category with this name already exists.");
    }

    await Category.create({ name });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send('Error creating category');
  }
};

exports.editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render('admin/editCategory', { title: 'Edit Category', category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).send('Error fetching category');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.update(
      { name },
      { where: { id } }
    );

    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Error updating category');
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const postCount = await Post.count({ where: { categoryId: id } });
    if (postCount > 0) {
      return res.status(400).send('Cannot delete category with associated posts');
    }

    await Category.destroy({ where: { id } });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Error deleting category');
  }
};

