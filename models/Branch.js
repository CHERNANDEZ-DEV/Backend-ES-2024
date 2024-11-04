const mongoose = require('mongoose');

// La sucursal debe tener una coleccion de vehiculos disponibles

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

module.exports = mongoose.model('Branch', branchSchema);