const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {timestamps: true});

module.exports = mongoose.model('Store', storeSchema);