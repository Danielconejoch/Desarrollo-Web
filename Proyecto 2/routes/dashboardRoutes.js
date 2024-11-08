const express = require('express');
const router = express.Router();
const { Post, Category, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'author', // Make sure this matches the alias used in the association
          attributes: ['username'] // Include only the username
        },
        {
          model: Comment,
          as: 'comments', // Ensure this matches the alias in the Comment model association
          attributes: ['id', 'content', 'username'] // Include id, content, and username of the comments
        }
      ]
    });

    const categories = await Category.findAll();
    const authors = await User.findAll({ where: { role: 'autor' } });
    const editingCommentId = req.query.editingCommentId || null;

    // Pass the session username to the template
    res.render('dashboard', {
      title: 'Bienvenido | Diario Web',
      posts,
      categories,
      authors,
      sessionUsername: req.session.username,
      editingCommentId 
    });
  } catch (error) {
    console.error('Error al cargar el dashboard:', error);
    res.status(500).send('Error al cargar la página principal');
  }
});

module.exports = router;
