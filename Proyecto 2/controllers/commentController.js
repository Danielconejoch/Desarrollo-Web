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

  async create(req, res) {
    try {
      const { postId, content } = req.body;
      const username = req.session.username; // Assuming session stores the logged-in user's username

      if (!username) {
        return res.status(401).send('You need to be logged in to comment.');
      }

      const newComment = await Comment.create({
        content,
        username,
        postId
      });
      
      console.log("Comment created:", newComment);
      res.redirect(`/dashboard`); // Redirect back to the dashboard
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).send("An error occurred while creating the comment.");
    }
  }

  async edit(req, res) {
    try {
      const commentId = req.params.id;
      res.redirect(`/dashboard?editingCommentId=${commentId}`);
    } catch (error) {
      console.error('Error setting comment to edit mode:', error.message);
      res.status(500).send('An error occurred while setting the comment to edit mode.');
    }
  }

  async update(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (comment && comment.username === req.session.username) {
        await comment.update({ content: req.body.content });
        console.log('Comment updated successfully');
      }
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error updating comment:', error.message);
      res.status(500).send('An error occurred while updating the comment.');
    }
  }

  async destroy(req, res) {
    try {
        // Fetch the comment by its ID from the request parameters
        const comment = await Comment.findByPk(req.params.id);
        
        // Check if the comment exists and if the user is the author
        if (comment && comment.username === req.session.username) {
            await comment.destroy();
            console.log('Comment deleted successfully:', comment.content);
            res.redirect('/dashboard'); // Redirect to the dashboard or the post's page after deletion
        } else {
            console.log("Unauthorized attempt to delete comment");
            res.redirect('/dashboard'); // Redirect if the user is unauthorized
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("An error occurred while deleting the comment.");
    }
  }

}

module.exports = new CommentController();
