exports.dashboard = (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard', username: req.session.username });
};