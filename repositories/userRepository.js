const User = require('../models/User');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserById = async (id) => {
    return await User.findById(id);
}

module.exports = {
    createUser, 
    findUserByEmail,
    findUserById
}