const userManageRepository = require('../repositories/userManageRepository');

const updateUser = async (userId, userData) => {
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