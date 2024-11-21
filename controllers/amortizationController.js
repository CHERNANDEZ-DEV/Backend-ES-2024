const amortizationService = require('../services/amortizationService');
const { handleError, ValidationError } = require('../utils/errorHandler');

const calcularAmortizacion = async (req, res) => {
    try {
        const { precio, tasaAnual, enganche, plazo, seguroAnual } = req.body;

        // Validaciones de entrada
        if (![precio, tasaAnual, enganche, plazo, seguroAnual].every(val => val !== undefined && val !== null)) {
            throw new ValidationError("Todos los campos (precio, tasaAnual, enganche, plazo, seguroAnual) son obligatorios.");
        }

        if (isNaN(precio) || precio <= 0) {
            throw new ValidationError("El precio debe ser un número positivo.");
        }
        if (isNaN(tasaAnual) || tasaAnual <= 0 || tasaAnual > 100) {
            throw new ValidationError("La tasa anual debe ser un número positivo menor o igual a 100.");
        }
        if (isNaN(enganche) || enganche < 0 || enganche > precio) {
            throw new ValidationError("El enganche debe ser un número positivo menor o igual al precio.");
        }
        if (!Number.isInteger(plazo) || plazo <= 0) {
            throw new ValidationError("El plazo debe ser un número entero positivo.");
        }
        if (isNaN(seguroAnual) || seguroAnual < 0) {
            throw new ValidationError("El seguro anual debe ser un número positivo.");
        }

        // Calcular la tabla de amortización
        const amortizaciones = amortizationService.calculeAmortization(precio, tasaAnual, enganche, plazo, seguroAnual);

        // Guardar las cuotas en la base de datos a través del servicio
        await amortizationService.guardarAmortizaciones(amortizaciones);

        // Retornar las cuotas calculadas
        res.status(200).json(amortizaciones);
    } catch (error) {
        // Usar el manejador de errores personalizado
        handleError(res, error);
    }
};

module.exports = {
    calcularAmortizacion,
};
