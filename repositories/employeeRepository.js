const Employee = require('../models/User');

const findAllEmployees = async () => {
    return await Employee.find();
}; 

module.exports = {
    findAllEmployees
}