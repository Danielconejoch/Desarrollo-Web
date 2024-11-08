const { Post, User, Comment } = require('../models'); 

exports.getProfilePosts = async (req, res) => {
  const username = req.session.username;
  try {
    console.log("Profile username:", username);
    const posts = await Post.findAll({
      where: { authorUsername: username },
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        { model: Comment, as: 'comments', attributes: ['username', 'content'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    console.log("Fetched profile posts:", posts.map(post => post.title));
    res.render('profile', { title: 'Profile', posts });
  } catch (error) {
    console.error("Error fetching profile posts:", error.message);
    res.status(500).send("Error loading profile.");
  }
}

