const requestService = require('../services/requestService');
const mongoose = require('mongoose');
const Request = require('../models/Request'); 
const { handleError, ValidationError, NotFoundError, PermissionError } = require('../utils/errorHandler');

// Helper function for email validation
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Helper function for phone number validation (simple format check)
const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[0-9]{8}$/;
    return phoneRegex.test(phone);
};

const save = async (req, res) => {
    try {
        const { customerFirstName, customerLastName, customerEmail, customerPhoneNumber, requestManufacturer, requestModel, store } = req.body;

        // Validate required fields
        if (!customerFirstName || !customerLastName || !customerEmail || !customerPhoneNumber || !requestManufacturer || !requestModel || !store) {
            throw new ValidationError('All fields are required');
        }

        // Validate email format
        if (!validateEmail(customerEmail)) {
            throw new ValidationError('Invalid email format');
        }

        // Validate phone number format
        if (!validatePhoneNumber(customerPhoneNumber)) {
            throw new ValidationError('Invalid phone number format');
        }

        // Check if the store is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(store)) {
            throw new ValidationError('Invalid store ID');
        }

        // Proceed to save the request
        const request = await requestService.saveProduct(req.body);
        res.status(201).json(request);
    } catch (error) {
        // Using the custom error handler
        handleError(res, error);
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await requestService.getAllRequests();
        res.status(200).json(requests);
    } catch (error) {
        // Using the custom error handler
        handleError(res, error);
    }
};

const deleteRequest = async (req, res) => {
    try {
        await requestService.deleteRequest(req.params.id);
        res.status(204).send();
    } catch (error) {
        // Using the custom error handler
        handleError(res, error);
    }
};

// Controlador para obtener solicitudes por ID de tienda
const getRequestsByStoreId = async (req, res) => {
    try {
        const { storeId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            throw new ValidationError('Invalid store ID');
        }

        const requests = await requestService.getRequestsByStoreId(storeId);
    

        if (!requests || requests.length === 0) {
            console.log("No requests found for this store ID");
            throw new NotFoundError('No requests found for this store ID');
        }

        return res.status(200).json(requests);
    } catch (error) {
        // Using the custom error handler
        handleError(res, error);
    }
};

module.exports = {
    save,
    getAllRequests,
    deleteRequest,
    getRequestsByStoreId
};
