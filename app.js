require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Importar la función de conexión
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoute');
const requestRoutes = require('./routes/requestRoutes');
const storesRoutes = require('./routes/storeRoutes');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('combined'));

// Conectar a MongoDB
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de productos
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/stores', storesRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
