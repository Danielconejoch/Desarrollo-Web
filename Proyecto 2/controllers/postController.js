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

  // Render the form to create a new post
  async create(req, res) {
    try {
      const categories = await Category.findAll();
      res.render('posts/create', { title: 'Create New Post', categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('An error occurred while loading the form.');
    }
  }

  // Handle form submission to create a new post
  async store(req, res) {
    const { title, summary, content, categoryId } = req.body;
    const authorUsername = req.session.username; // Assuming the username is stored in session

    try {
      const newPost = await Post.create({ title, summary, content, categoryId, authorUsername });
      console.log('Post created successfully:', newPost.title);
      res.redirect('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('An error occurred while creating the post.');
    }
  }

  async edit(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      const categories = await Category.findAll();
      if (post && post.authorUsername === req.session.username) {
        res.render('posts/edit', { title: 'Edit Post', post, categories });
      } else {
        console.log("Unauthorized access to edit post");
        res.redirect('/profile');
      }
    } catch (error) {
      console.error("Error fetching post for edit:", error);
      res.status(500).send("An error occurred while fetching the post.");
    }
  }

  async update(req, res) {
    const { title, summary, content, categoryId } = req.body;

    try {
      const post = await Post.findByPk(req.params.id);
      if (post && post.authorUsername === req.session.username) {
        await post.update({ title, summary, content, categoryId });
        console.log('Post updated successfully:', post.title);
        res.redirect('/profile');
      } else {
        console.log("Unauthorized access to update post");
        res.redirect('/profile');
      }
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).send("An error occurred while updating the post.");
    }
  }

  async destroy(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (post && post.authorUsername === req.session.username) {
        await post.destroy();
        console.log('Post deleted successfully:', post.title);
        res.redirect('/profile');
      } else {
        console.log("Unauthorized attempt to delete post");
        res.redirect('/profile');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).send("An error occurred while deleting the post.");
    }
  }
}

module.exports = new PostController();
