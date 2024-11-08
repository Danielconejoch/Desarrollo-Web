const ensureAuthenticated = (req, res, next) => {
  if (!req.session.username) { // Verificar si hay un username en la sesión
    return res.redirect('/auth/login'); // Redirigir a login si no hay sesión
  }
  next(); // Procede al siguiente middleware o ruta
};

module.exports = { ensureAuthenticated };
