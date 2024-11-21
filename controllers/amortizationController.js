const amortizationService = require('../services/amortizationService');
const { handleError, ValidationError } = require('../utils/errorHandler');

const calcularAmortizacion = async (req, res) => {
    try {
        const { precio, tasaAnual, enganche, plazo, seguroAnual } = req.body;

        // Validaciones de entrada
        if (![precio, tasaAnual, enganche, plazo, seguroAnual].every(val => val !== undefined && val !== null)) {
            throw new ValidationError("Todos los campos (precio, tasaAnual, enganche, plazo, seguroAnual) son obligatorios.");
        }

        // Calcular la tabla de amortización
        const amortizaciones = amortizationService.calculeAmortization(precio, tasaAnual, enganche, plazo, seguroAnual);

        // Guardar las cuotas en la base de datos a través del servicio
        //await amortizationService.guardarAmortizaciones(amortizaciones);

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
