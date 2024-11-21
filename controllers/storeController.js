// const storeService = require('../services/storeService');

// const saveStore = async (req, res) => {
//     try {
//         const store = await storeService.saveStore(req.body);
//         res.status(201).json(store);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const getAllStores = async (req, res) => {
//     try{
//         const stores = await storeService.getAllStores();
//         res.status(200).json(stores);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getStoreById = async (req, res) => {
//     try{
//         const store = await storeService.getStoreById(req.params.id);
//         res.status(200).json(store);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const assingEmployeesToStore = async (req, res) => {
//     try{
//         const store = await storeService.assingEmployeesToStore(req.params.id, req.body.employees);
//         res.status(200).json(store);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const assignVehiclesToStore = async (req, res) => {
//     try{
//         const store = await storeService.assignVehiclesToStore(req.params.id, req.body.vehicles);
//         res.status(200).json(store);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateStore = async (req, res) => {
//     try{
//         const store = await storeService.updateStore(req.params.id, req.body);
//         res.status(200).json(store);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// module.exports = {
//     saveStore,
//     getAllStores,
//     getStoreById,
//     assingEmployeesToStore,
//     assignVehiclesToStore,
//     updateStore
// }

const storeService = require('../services/storeService');
const { handleError, ValidationError, NotFoundError } = require('../utils/errorHandler');
const mongoose = require('mongoose');

// Validar si un campo es un ObjectId válido
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Guardar tienda
const saveStore = async (req, res) => {
    try {
        const { name, address, phoneNumber, email, employees, vehicles } = req.body;

        // Validación de campos obligatorios
        if (!name || !address || !phoneNumber || !email) {
            throw new ValidationError('Los campos name, address, phoneNumber y email son obligatorios.');
        }

        // Validar formato de teléfono (debe ser 8 dígitos)
        const phoneRegex = /^[0-9]{8}$/;  // 8 dígitos sin espacios ni caracteres
        if (!phoneNumber.match(phoneRegex)) {
            throw new ValidationError('El número de teléfono debe tener un formato de 8 dígitos (por ejemplo, 75015904).');
        }

        // Validar formato de email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailRegex)) {
            throw new ValidationError('El email debe tener un formato válido.');
        }

        // Validar referencias de empleados (si se proporcionan)
        if (employees && !Array.isArray(employees)) {
            throw new ValidationError('El campo employees debe ser un arreglo de identificadores.');
        }
        if (employees && employees.some(id => !isValidObjectId(id))) {
            throw new ValidationError('Uno o más identificadores de empleados no son válidos.');
        }

        // Validar referencias de vehículos (si se proporcionan)
        if (vehicles && !Array.isArray(vehicles)) {
            throw new ValidationError('El campo vehicles debe ser un arreglo de identificadores.');
        }
        if (vehicles && vehicles.some(id => !isValidObjectId(id))) {
            throw new ValidationError('Uno o más identificadores de vehículos no son válidos.');
        }

        // Si pasan todas las validaciones, guardar la tienda
        const store = await storeService.saveStore(req.body);
        res.status(201).json(store);
    } catch (error) {
        handleError(res, error);
    }
};

// Obtener todas las tiendas
const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores(); // No se pasa paginación
        res.status(200).json(stores);
    } catch (error) {
        handleError(res, error);
    }
};

// Obtener tienda por ID
const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validación de ID de tienda
        if (!isValidObjectId(id)) {
            throw new ValidationError('ID de tienda inválido.');
        }

        const store = await storeService.getStoreById(id);
        if (!store) {
            throw new NotFoundError('Tienda no encontrada.');
        }
        res.status(200).json(store);
    } catch (error) {
        handleError(res, error);
    }
};

// Asignar empleados a la tienda
const assingEmployeesToStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { employees } = req.body;

        // Validación de ID de tienda
        if (!isValidObjectId(id)) {
            throw new ValidationError('ID de tienda inválido.');
        }

        // Validar que employees sea un arreglo de ObjectIds válidos
        if (!Array.isArray(employees) || employees.some(id => !isValidObjectId(id))) {
            throw new ValidationError('El campo employees debe ser un arreglo de identificadores válidos.');
        }

        const store = await storeService.assingEmployeesToStore(id, employees);
        res.status(200).json(store);
    } catch (error) {
        handleError(res, error);
    }
};

// Asignar vehículos a la tienda
const assignVehiclesToStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { vehicles } = req.body;

        // Validación de ID de tienda
        if (!isValidObjectId(id)) {
            throw new ValidationError('ID de tienda inválido.');
        }

        // Validar que vehicles sea un arreglo de ObjectIds válidos
        if (!Array.isArray(vehicles) || vehicles.some(id => !isValidObjectId(id))) {
            throw new ValidationError('El campo vehicles debe ser un arreglo de identificadores válidos.');
        }

        const store = await storeService.assignVehiclesToStore(id, vehicles);
        res.status(200).json(store);
    } catch (error) {
        handleError(res, error);
    }
};

// Actualizar tienda
const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const storeData = req.body;

        // Validación de ID de tienda
        if (!isValidObjectId(id)) {
            throw new ValidationError('ID de tienda inválido.');
        }

        // Validar campos obligatorios
        if (!storeData.name || !storeData.address || !storeData.phoneNumber || !storeData.email) {
            throw new ValidationError('Los campos name, address, phoneNumber y email son obligatorios.');
        }

        // Validar formato de teléfono (debe ser 8 dígitos)
        const phoneRegex = /^[0-9]{8}$/;
        if (!storeData.phoneNumber.match(phoneRegex)) {
            throw new ValidationError('El número de teléfono debe tener un formato de 8 dígitos (por ejemplo, 75015904).');
        }

        // Validar formato de email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!storeData.email.match(emailRegex)) {
            throw new ValidationError('El email debe tener un formato válido.');
        }

        const store = await storeService.updateStore(id, storeData);
        if (!store) {
            throw new NotFoundError('Tienda no encontrada.');
        }
        res.status(200).json(store);
    } catch (error) {
        handleError(res, error);
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;

        // Validación de ID de tienda
        if (!isValidObjectId(id)) {
            throw new ValidationError('ID de tienda inválido.');
        }

        const store = await storeService.getStoreById(id);
        if (!store) {
            throw new NotFoundError('Tienda no encontrada.');
        }
        
        await storeService.deleteStore(id);
        res.status(204).send();

    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    saveStore,
    getAllStores,
    getStoreById,
    assingEmployeesToStore,
    assignVehiclesToStore,
    updateStore,
    deleteStore
}

