const { Post, User, Category, Comment } = require('../models');

class PostController {
  async index(req, res) {
    try {
      console.log("Fetching posts for dashboard...");
      const posts = await Post.findAll({
        include: [
          { model: User, as: 'author', attributes: ['username'] },
          { model: Category, attributes: ['name'] },
          { model: Comment, as: 'comments', attributes: ['id', 'content', 'username'] }
        ],
        order: [['createdAt', 'DESC']],
        limit: 5
      });
      console.log("Posts fetched:", posts.map(post => post.title));
      res.render('posts/index', { title: 'Publicaciones', posts });
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    if (req.method === 'POST') {
      try {
        console.log("Creating a new post:", req.body);
        await Post.create(req.body);
        res.redirect('/posts');
      } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).send(error.message);
      }
    } else {
      try {
        console.log("Fetching users and categories for new post form...");
        const users = await User.findAll();
        const categories = await Category.findAll();
        res.render('posts/create', { title: 'Agregar Publicación', users, categories });
      } catch (error) {
        console.error("Error fetching users/categories:", error.message);
      }
    }
  }

  async update(req, res) {
    if (req.method === 'POST') {
      try {
        console.log("Updating post with ID:", req.params.id);
        await Post.update(req.body, { where: { id: req.params.id } });
        res.redirect('/posts');
      } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).send(error.message);
      }
    } else {
      try {
        console.log("Fetching post details for ID:", req.params.id);
        const post = await Post.findByPk(req.params.id);
        const users = await User.findAll();
        const categories = await Category.findAll();
        res.render('posts/edit', { title: 'Editar Publicación', post, users, categories });
      } catch (error) {
        console.error("Error fetching post details:", error.message);
      }
    }
  }
}

module.exports = new PostController();
