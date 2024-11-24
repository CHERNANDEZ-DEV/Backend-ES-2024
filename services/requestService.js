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

    // Obtener las solicitudes desde el repositorio
    const requests = await requestRepository.findRequestsByStoreId(storeId);

    return requests;
};

module.exports = {
    saveProduct,
    getAllRequests,
    deleteRequest,
    getRequestsByStoreId
};