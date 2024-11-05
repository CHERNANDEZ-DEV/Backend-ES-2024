const User = require('../models/User');

const createUser = async (userData) => {
    const user = new User(userData);
    return user.save();
};

const findUserByEmail = async (email) => {
    return  User.findOne({ email });
};

const findUserById = async (id) => {
    return User.findById(id);
}

const findEmployeesByIds = async (employeeIds) => {
    return User.find({ _id: { $in: employeeIds } });
}

module.exports = {
    createUser, 
    findUserByEmail,
    findUserById
}