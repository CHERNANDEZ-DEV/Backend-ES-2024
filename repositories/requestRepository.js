const Request = require('../models/Request');

const saveRequest = async(requestData) => {
    const request = new Request(requestData);
    return request.save(requestData);
};

const findAllRequests = async () => {
    return Request.find();
};

const deleteRequest = async (requestID) => {
    return Request.findByIdAndDelete(requestID);
};

module.exports = {
    saveRequest,
    findAllRequests,
    deleteRequest
};