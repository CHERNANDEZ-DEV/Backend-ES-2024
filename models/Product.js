const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 0 }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
