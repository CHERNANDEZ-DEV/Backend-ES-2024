const requestRepository = require('../repositories/requestRepository');

const createRequest = async(requestData) => {
    return await requestRepository.createRequest(requestData);
};

const getAllRequests = async () => {
    return await requestRepository.findAllRequests();
};

const deleteRequest = async (requestData) => {
    return await requestRepository.deleteRequest(requestData)
};

module.exports = {
    createRequest,
    getAllRequests,
    deleteRequest
}