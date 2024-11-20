const Amortization = require('../models/Amortization');

const calculeAmortization = (precio, tasaAnual, enganche, plazo, seguroAnual) => {

    const tasaMensual = tasaAnual / 12 / 100;
    const montoFinanciado = precio - enganche;
    const cuotaBase = (montoFinanciado * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    const seguroMensual = seguroAnual / 12;

    let saldoInicial = montoFinanciado;
    let amortizaciones = [];

    for (let i = 1; i <= plazo; i++) {
        const intereses = saldoInicial * tasaMensual;
        const amortizacion = cuotaBase - intereses;
        const saldoFinal = saldoInicial - amortizacion;

        amortizaciones.push({
            cuota: i,
            saldoInicial: saldoInicial.toFixed(2),
            intereses: intereses.toFixed(2),
            amortizacion: amortizacion.toFixed(2),
            seguro: seguroMensual.toFixed(2),
            pagoTotal: (cuotaBase + seguroMensual).toFixed(2),
            saldoFinal: saldoFinal.toFixed(2),
            fechaPago: new Date(new Date().setMonth(new Date().getMonth() + i))
        });

        saldoInicial = saldoFinal;
    }

    return amortizaciones
}

const guardarAmortizaciones = async(amortizaciones) => {
    try {
        await Amortization.insertMany(amortizaciones);
    } catch (error) {
        console.error("Error al guardar las amortizaciones:", error);
        throw new Error('No se pudieron guardar las amortizaciones.');
    }

}

module.exports = {
    calculeAmortization,
    guardarAmortizaciones
};