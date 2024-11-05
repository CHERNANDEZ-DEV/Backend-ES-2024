const requestRepository = require('../repositories/requestRepository');

const saveProduct = async (requestData) => {
    return await requestRepository.saveRequest(requestData);
};

const getAllRequests = async () => {
    return await requestRepository.findAllRequests();
};

const deleteRequest = async (requestID) => {
    return await requestRepository.deleteRequest(requestID);
};

module.exports = {
    saveProduct,
    getAllRequests,
    deleteRequest
};