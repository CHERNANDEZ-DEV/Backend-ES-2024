require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Importar la función de conexión
const productRoutes = require('./routes/productRoutes');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));

// Conectar a MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de productos
app.use('/api/products', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
