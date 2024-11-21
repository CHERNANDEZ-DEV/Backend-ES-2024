const storeRepository = require('../repositories/storeRepository');
const mongoose = require('mongoose');
const { handleError, ValidationError, NotFoundError } = require('../utils/errorHandler');

const saveStore = async (storeData) => {
    return storeRepository.saveStore(storeData);
};

const getAllStores = async () => {
    return storeRepository.findAllStores();
};

const getStoreById = async (storeId) => {
    const store = await storeRepository.findStoreById(storeId);
    return  store;
};

const assingEmployeesToStore = async (storeId, employeeIds) => {
    const store = await storeRepository.findStoreById(storeId);
    store.employees.push(...employeeIds);
    return store.save();
};

const assignVehiclesToStore = async (storeId, vehicleIds) => {
    const store = await storeRepository.findStoreById(storeId);
    store.vehicles.push(...vehicleIds);
    return store.save();
};

// Función para validar si un ID es un ObjectId válido
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Servicio para actualizar tienda
const updateStore = async (storeId, storeData) => {
    // Primero, validamos que el ID de la tienda sea un ObjectId válido
    if (!isValidObjectId(storeId)) {
        throw new ValidationError('ID de tienda inválido.');
    }

    // Buscamos la tienda por ID
    const store = await storeRepository.findStoreById(storeId);
    if (!store) {
        throw new ValidationError('Tienda no encontrada.');
    }

    // Actualizamos los campos básicos
    store.name = storeData.name || store.name;
    store.address = storeData.address || store.address;
    store.email = storeData.email || store.email;
    store.phoneNumber = storeData.phoneNumber || store.phoneNumber;

    // Validación y asignación de empleados
    if (storeData.employees) {
        if (!Array.isArray(storeData.employees) || storeData.employees.some(id => !isValidObjectId(id))) {
            throw new ValidationError('El campo employees debe ser un arreglo de identificadores válidos.');
        }
        store.employees = storeData.employees; // Asignamos los nuevos empleados
    }

    // Validación y asignación de vehículos
    if (storeData.vehicles) {
        if (!Array.isArray(storeData.vehicles) || storeData.vehicles.some(id => !isValidObjectId(id))) {
            throw new ValidationError('El campo vehicles debe ser un arreglo de identificadores válidos.');
        }
        store.vehicles = storeData.vehicles; // Asignamos los nuevos vehículos
    }

    // Guardamos los cambios en la tienda
    return store.save();
}

const deleteStore = async (storeId) => {
    return await storeRepository.deleteStore(storeId);
};


module.exports = {
    saveStore,
    getAllStores,
    getStoreById,
    assingEmployeesToStore,
    updateStore,
    deleteStore
};