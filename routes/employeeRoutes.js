const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/', employeeController.getAll);

module.exports = router;