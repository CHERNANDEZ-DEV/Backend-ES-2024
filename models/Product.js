const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: Array, required: true },
    engine: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    stock: { type: Number, default: 0 },
    transmission: {type: String, required: true},
    mileage: {type: Number, required: true, default: 0},
    status: { type: String, default: 'new' },
    fuelType: { type: String, required: true, default: 'gasoline' },
    vinCode: { type: String, required: true },
    driveTrain: { type: String, required: true },
    numberOfDoors: { type: Number, required: true },
    color: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    description: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
