const Request = require('../models/Request');

const saveRequest = async(requestData) => {
    const request = new Request(requestData);
    return request.save(requestData);
};

const findAllRequests = async () => {
    return Request.find().populate('store');
};

const deleteRequest = async (requestID) => {
    return Request.findByIdAndDelete(requestID);
};

// const getRequestsByStoreId = async (storeID) => {
//     const requests = await Request.find().populate('store');
//     console.log(requests)
//     return requests.filter(request => (request.store._id.toString === storeID));
// }

// Obtener solicitudes por ID de tienda
const findRequestsByStoreId = async (storeId) => {
    return await Request.find({ store: storeId }).populate('store');
};

module.exports = {
    saveRequest,
    findAllRequests,
    deleteRequest,
    findRequestsByStoreId
}