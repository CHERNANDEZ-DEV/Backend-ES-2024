const User = require('../models/User');

const updateUser = async (userId, userData) => {

    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const getAllUsers = async () => {
    return await User.find();
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers
}