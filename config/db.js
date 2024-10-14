// config/db.js
const mongoose = require('mongoose');

// Función para conectar a MongoDB
const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
};

module.exports = connectDB;
