const { Post, User, Category } = require('../models');

class PostController {
  async index(req, res) {
    try {
      const posts = await Post.findAll({ include: [User, Category] });
      res.render('posts/index', { title: 'Publicaciones', posts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    if (req.method === 'POST') {
      try {
        await Post.create(req.body);
        res.redirect('/posts');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const users = await User.findAll();
      const categories = await Category.findAll();
      res.render('posts/create', { title: 'Agregar Publicación', users, categories });
    }
  }

  async update(req, res) {
    if (req.method === 'POST') {
      try {
        await Post.update(req.body, { where: { id: req.params.id } });
        res.redirect('/posts');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const post = await Post.findByPk(req.params.id, { include: [User, Category] });
      const users = await User.findAll();
      const categories = await Category.findAll();
      res.render('posts/update', { title: 'Editar Publicación', post, users, categories });
    }
  }

  async delete(req, res) {
    try {
      await Post.destroy({ where: { id: req.params.id } });
      res.redirect('/posts');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new PostController();
