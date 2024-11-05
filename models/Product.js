const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
