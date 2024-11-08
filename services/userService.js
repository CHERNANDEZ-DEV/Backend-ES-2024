// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const registerUser = async (userData) => {
  const { email, password } = userData;

  // Verificar si el usuario ya existe
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;

  // Asignar el rol predeterminado de "user"
  if(userData.role === null){
    userData.role = 'user';
  }

  return await userRepository.createUser(userData);
};

const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user };
};

module.exports = {
  registerUser,
  loginUser
};
