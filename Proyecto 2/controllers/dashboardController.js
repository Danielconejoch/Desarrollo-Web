const Post = require('../models').Post;
const Category = require('../models').Category;
const User = require('../models').User;

async function renderDashboard(req, res) {
  const posts = await Post.findAll({ include: ['author', 'category', 'comments'] });
  const categories = await Category.findAll();
  const authors = await User.findAll({ where: { role: 'autor' } });

  res.render('dashboard', { 
    title: 'Diario web', 
    posts, 
    categories, 
    authors 
  });
}

module.exports = { renderDashboard };
