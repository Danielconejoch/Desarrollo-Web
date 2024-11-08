var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importar rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var dashboardRouter = require('./routes/dashboardRoutes');
const authRouter = require('./routes/authRoutes.js');
const profileRouter = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const { ensureAuthenticated } = require('./middlewares/authMiddleware');

var app = express();

// Configuración del motor de vistas (Twig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
app.use(session({
  secret: 'password123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes configuration
app.use('/auth', authRouter);

// Public routes
app.use('/home', indexRouter);

// Protected routes (require authentication)
app.use('/dashboard', ensureAuthenticated, dashboardRouter);
app.use('/users', ensureAuthenticated, usersRouter);
app.use('/profile', ensureAuthenticated, profileRouter);
app.use('/posts', ensureAuthenticated, postRoutes);

// Default route to redirect to login if not authenticated
app.get('/', (req, res) => {
  if (!req.cookies.token) { // Assuming token is set in cookies when logged in
    return res.redirect('/auth/login');
  }
  res.redirect('/dashboard'); // If authenticated, redirect to dashboard or desired page
});

// Captura de errores 404 y forward al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Configura las variables locales, proporcionando errores solo en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
