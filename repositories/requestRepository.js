const Request = require('../models/Request');

const createRequest= async(requestData) => {
    const request = new Request(requestData);
    return await request.save();
};

const findAllRequests = async () => {
    return await Request.find();
};

const deleteRequest = async (requestId) => {
    return await Request.findByIdAndDelete(requestId);
}; 

module.exports = {
    createRequest,
    findAllRequests,
    deleteRequest
}