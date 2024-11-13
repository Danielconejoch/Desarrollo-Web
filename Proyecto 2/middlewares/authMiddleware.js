const ensureAuthenticated = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/auth/login');
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect('/auth/login');
  }
  if (req.session.role !== 'administrador') {
    return res.status(403).send('Access denied');
  }
  next();
};

module.exports = { ensureAuthenticated, checkAdmin };
