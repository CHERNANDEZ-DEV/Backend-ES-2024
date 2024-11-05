// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../config/auth');

const router = express.Router();

// Ruta de registro de usuario normal (no requiere autenticación)
router.post('/register', userController.register);

// Ruta de inicio de sesión
router.post('/login', userController.login);

// Ruta protegida (perfil de usuario, requiere token)
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}`, user: req.user });
});

// Ruta protegida para admins
router.get('/admin-data', authenticateToken, authorizeAdmin, (req, res) => {
  res.json({ message: 'This is admin-only data' });
});

module.exports = router;