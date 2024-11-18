const mongoose = require('mongoose');

const amortizationSchema = new mongoose.Schema({
    cuota: Number,
    saldoInicial: Number,
    intereses: Number,
    amortizacion: Number,
    seguro: Number,
    pagoTotal: Number,
    saldoFinal: Number,
    fechaPago: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Amortization', amortizationSchema);


