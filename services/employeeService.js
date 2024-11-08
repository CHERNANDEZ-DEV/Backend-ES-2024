const employeeRepository = require('../repositories/employeeRepository');
const storeService = require('./storeService');

const getAllEmployees = async () => {
    const employees = await employeeRepository.findAllEmployees();
    return employees.filter((employee) => employee.role === "seller");
};

module.exports = {
    getAllEmployees
};
