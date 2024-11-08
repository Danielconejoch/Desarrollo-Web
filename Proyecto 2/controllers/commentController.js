const { Comment, User, Post } = require('../models');

class CommentController {
  async index(req, res) {
    try {
      const comments = await Comment.findAll({ include: [User, Post] });
      res.render('comments/index', { title: 'Comentarios', comments });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    if (req.method === 'POST') {
      try {
        await Comment.create(req.body);
        res.redirect('/comments');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const users = await User.findAll();
      const posts = await Post.findAll();
      res.render('comments/create', { title: 'Agregar Comentario', users, posts });
    }
  }

  async update(req, res) {
    if (req.method === 'POST') {
      try {
        await Comment.update(req.body, { where: { id: req.params.id } });
        res.redirect('/comments');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const comment = await Comment.findByPk(req.params.id, { include: [User, Post] });
      const users = await User.findAll();
      const posts = await Post.findAll();
      res.render('comments/update', { title: 'Editar Comentario', comment, users, posts });
    }
  }

  async delete(req, res) {
    try {
      await Comment.destroy({ where: { id: req.params.id } });
      res.redirect('/comments');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new CommentController();
