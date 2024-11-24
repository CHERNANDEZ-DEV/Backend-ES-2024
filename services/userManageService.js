const userManageRepository = require('../repositories/userManageRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const updateUser = async (userId, userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return await userManageRepository.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
    return await userManageRepository.deleteUser(userId);
};

const getAllUsers = async () => {
    return await userManageRepository.getAllUsers();
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers
};