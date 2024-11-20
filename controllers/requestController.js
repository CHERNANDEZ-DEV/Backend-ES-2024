const requestService = require('../services/requestService');
const mongoose = require('mongoose');
const Request = require('../models/Request'); 

const save = async (req, res) => {
    try {
        const request = await requestService.saveProduct(req.body);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await requestService.getAllRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        await requestService.deleteRequest(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener solicitudes por ID de tienda
const getRequestsByStoreId = async (req, res) => {
    try {
        const { storeId } = req.params;

        // Delegar al servicio
        const requests = await requestService.getRequestsByStoreId(storeId);

        // Retornar respuesta exitosa
        return res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error.message);

        // Responder según el tipo de error
        if (error.message === 'Invalid store ID') {
            return res.status(400).json({ message: error.message });
        } else if (error.message === 'No requests found for this store ID') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

module.exports = {
    save,
    getAllRequests,
    deleteRequest,
    getRequestsByStoreId
}