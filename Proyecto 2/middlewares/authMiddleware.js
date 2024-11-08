const ensureAuthenticated = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = { ensureAuthenticated };
