const productService = require('../services/productService');
const mongoose = require('mongoose');
const { handleError, ValidationError } = require('../utils/errorHandler');

// Helper function for validating numeric fields (positive numbers)
const validateNumber = (field, name) => {
    if (field < 0 || isNaN(field)) {
        throw new ValidationError(`${name} must be a positive number`);
    }
};

// Helper function for validating strings (non-empty)
const validateString = (field, name) => {
    if (!field || typeof field !== 'string' || field.trim() === '') {
        throw new ValidationError(`${name} is required and must be a non-empty string`);
    }
};

// Helper function for validating array (for image field)
const validateArray = (field, name) => {
    if (!Array.isArray(field) || field.length === 0) {
        throw new ValidationError(`${name} must be a non-empty array`);
    }
};

const create = async (req, res) => {
    try {
        const {
            manufacturer,
            model,
            image,
            engine,
            year,
            price,
            type,
            stock,
            transmission,
            mileage,
            status,
            fuelType,
            driveTrain,
            numberOfDoors,
            color,
            seatingCapacity,
            description,
            fuelRange,
            weight,
            wheel_length,
            aceleration
        } = req.body;

        // Validate required fields
        validateString(manufacturer, 'Manufacturer');
        validateString(model, 'Model');
        validateArray(image, 'Image');
        validateString(engine, 'Engine');
        validateNumber(year, 'Year');
        validateString(price, 'Price');
        validateString(type, 'Type');
        validateString(transmission, 'Transmission');
        validateNumber(mileage, 'Mileage');
        validateString(fuelType, 'Fuel Type');
        validateString(driveTrain, 'Drive Train');
        validateNumber(numberOfDoors, 'Number of Doors');
        validateString(color, 'Color');
        validateNumber(seatingCapacity, 'Seating Capacity');
        validateString(description, 'Description');
        validateNumber(fuelRange, 'Fuel Range');
        validateNumber(weight, 'Weight');
        validateNumber(wheel_length, 'Wheel Length');
        validateString(aceleration, 'Aceleration');

        // Prepare product data for saving
        const productData = {
            manufacturer,
            model,
            image,
            engine,
            year,
            price,
            type,
            stock,  // No default value, taken directly from request
            transmission,
            mileage,
            status,  // No default value, taken directly from request
            fuelType,  // No default value, taken directly from request
            driveTrain,
            numberOfDoors,
            color,
            seatingCapacity,
            description,
            fuelRange,
            weight,
            wheel_length,
            aceleration
        };

        // Save product
        const product = await productService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        // Use the handleError utility to manage error responses
        handleError(res, error);
    }
};

const getAll = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        // Use the handleError utility to manage error responses
        handleError(res, error);
    }
};

const getById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        // Use the handleError utility to manage error responses
        handleError(res, error);
    }
};

const update = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        // Use the handleError utility to manage error responses
        handleError(res, error);
    }
};

const remove = async (req, res) => {
    try {
        await productService.deleteproduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        // Use the handleError utility to manage error responses
        handleError(res, error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
