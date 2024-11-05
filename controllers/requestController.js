const requestService = require('../services/requestService');

const save = async (req, res) => {
    try {
        const request = await requestService.saveProduct(req.body);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllRequests = async (req, res) => {
    try{
        const requests = await requestService.getAllRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try{
        await requestService.deleteRequest(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    save,
    getAllRequests,
    deleteRequest
}