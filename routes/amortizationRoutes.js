const express = require('express');
const amortizationController = require('../controllers/amortizationController');

const router = express.Router();

// Ruta para calcular la amortización
router.post('/calcular', amortizationController.calcularAmortizacion);

module.exports = router;
