const requestService = require('../services/requestService');

const create = async (req, res) => {
    try{
        const request = await requestService.createRequest(req.body);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAll = async (req, res) => {
    try{
        const requests = await requestService.getAllRequests();
        res.json(requests);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await requestService.deleteRequest(req.params.id);
        res.status(204).send();
    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    create,
    getAll,
    remove
}