const amortizationService = require('../services/amortizationService');

const calcularAmortizacion = async(req, res) => {
    try {
        const { precio, tasaAnual, enganche, plazo, seguroAnual } = req.body;

        // Verificar si los datos están presentes
        if (!precio || !tasaAnual || !enganche || !plazo || !seguroAnual) {
            return res.status(400).json({ error: "Faltan datos necesarios." });
        }

        // Calcular la tabla de amortización
        const amortizaciones = amortizationService.calculeAmortization(precio, tasaAnual, enganche, plazo, seguroAnual);

        // Guardar las cuotas en la base de datos a través del servicio
        await amortizationService.guardarAmortizaciones(amortizaciones);

        // Retornar las cuotas calculadas
        res.status(200).json(amortizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al calcular la amortización." });
    }
}

module.exports = {
    calcularAmortizacion
};
