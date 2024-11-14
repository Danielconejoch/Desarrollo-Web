const { User, Category, Post, Comment } = require('../models');

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

exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        { model: Comment, as: 'comments' }
      ],
    });
    const categories = await Category.findAll();
    const authors = await User.findAll({ where: { role: 'autor' } });
    const editingCommentId = req.query.editingCommentId || null;

    res.render('admin/managePosts', {
      title: 'Manage Posts',
      posts,
      categories,
      authors,
      sessionUsername: req.session.username,
      editingCommentId,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
};


exports.createPostForm = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('admin/createPost', { title: 'Create New Post', categories });
  } catch (error) {
    console.error('Error loading categories:', error);
    res.status(500).send('Error loading categories');
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, summary, categoryId } = req.body;
    const authorUsername = req.session.username;
    await Post.create({ title, content, summary, categoryId, authorUsername });
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post');
  }
};

exports.editPostForm = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    const categories = await Category.findAll();
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('admin/editPost', { title: 'Edit Post', post, categories });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Error fetching post');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, summary, categoryId } = req.body;
    await Post.update(
      { title, content, summary, categoryId },
      { where: { id: req.params.id, authorUsername: req.session.username } }
    );
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Error updating post');
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Error deleting post');
  }
};

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const username = req.session.username;
    await Comment.create({ postId, content, username });
    res.redirect(`/admin/posts`);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Error creating comment');
  }
};

exports.editComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const postId = req.query.postId;

    res.redirect(`/admin/posts?editingCommentId=${commentId}&postId=${postId}`);
  } catch (error) {
    console.error('Error setting comment to edit mode:', error.message);
    res.status(500).send('An error occurred while setting the comment to edit mode.');
  }
};


exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    await Comment.update(
      { content },
      { where: { id } }
    );

    const postId = req.query.postId;
    res.redirect(`/admin/posts?postId=${postId}`);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).send('Error updating comment');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Error deleting comment');
  }
};

exports.filterPostsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const posts = await Post.findAll({
      where: { categoryId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        { model: Comment, as: 'comments', attributes: ['id', 'content', 'username'] }
      ]
    });

    const categories = await Category.findAll();
    const authors = await User.findAll({ where: { role: 'autor' } });

    res.render('admin/managePosts', {
      title: 'Manage Posts | Filter by Category',
      posts,
      categories,
      authors,
      sessionUsername: req.session.username,
      editingCommentId: null
    });
  } catch (error) {
    console.error('Error filtering posts by category:', error);
    res.status(500).send('Error filtering posts by category');
  }
};

exports.filterPostsByAuthor = async (req, res) => {
  try {
    const { authorUsername } = req.params;

    const posts = await Post.findAll({
      where: { authorUsername },
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        { model: Comment, as: 'comments', attributes: ['id', 'content', 'username'] }
      ]
    });

    const categories = await Category.findAll();
    const authors = await User.findAll({ where: { role: 'autor' } });

    res.render('admin/managePosts', {
      title: 'Manage Posts | Filter by Author',
      posts,
      categories,
      authors,
      sessionUsername: req.session.username,
      editingCommentId: null
    });
  } catch (error) {
    console.error('Error filtering posts by author:', error);
    res.status(500).send('Error filtering posts by author');
  }
};