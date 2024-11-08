const employeeService = require('../services/employeeService');

const getAll = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll
}