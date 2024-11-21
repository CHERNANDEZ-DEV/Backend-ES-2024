const employeeService = require('../services/employeeService');
const { handleError } = require('../utils/errorHandler');

const getAll = async (req, res) => {
    try {
        // Fetch all employees without pagination
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        handleError(res, error); // Use the error handler utility
    }
};

module.exports = {
    getAll,
};
