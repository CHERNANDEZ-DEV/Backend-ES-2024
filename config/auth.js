// config/auth.js
const jwt = require('jsonwebtoken');

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;  // Guardar la información del token en la request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware para verificar si el usuario es administrador
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access restricted to admins only' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeAdmin
};

