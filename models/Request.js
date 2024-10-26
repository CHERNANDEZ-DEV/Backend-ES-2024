const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhoneNumber: { type: Number, required: true  },
    requestManufacturer: { type: String, required: true },
    requestModel: { type: String, required: true }
})