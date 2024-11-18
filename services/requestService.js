const requestRepository = require('../repositories/requestRepository');
const mongoose = require('mongoose');

const saveProduct = async (requestData) => {
    return await requestRepository.saveRequest(requestData);
};

const getAllRequests = async () => {
    return await requestRepository.findAllRequests();
};

const deleteRequest = async (requestID) => {
    return await requestRepository.deleteRequest(requestID);
};

// Servicio para obtener solicitudes por ID de tienda
const getRequestsByStoreId = async (storeId) => {
    // Validar que el ID de la tienda sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
        throw new Error('Invalid store ID');
    }

    // Obtener las solicitudes desde el repositorio
    const requests = await requestRepository.findRequestsByStoreId(storeId);

    // Validar si se encontraron solicitudes
    if (!requests.length) {
        throw new Error('No requests found for this store ID');
    }

    return requests;
};

module.exports = {
    saveProduct,
    getAllRequests,
    deleteRequest,
    getRequestsByStoreId
};