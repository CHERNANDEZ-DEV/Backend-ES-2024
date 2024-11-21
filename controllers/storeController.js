const storeService = require('../services/storeService');

const saveStore = async (req, res) => {
    try {
        const store = await storeService.saveStore(req.body);
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllStores = async (req, res) => {
    try{
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStoreById = async (req, res) => {
    try{
        const store = await storeService.getStoreById(req.params.id);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const assingEmployeesToStore = async (req, res) => {
    try{
        const store = await storeService.assingEmployeesToStore(req.params.id, req.body.employees);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const assignVehiclesToStore = async (req, res) => {
    try{
        const store = await storeService.assignVehiclesToStore(req.params.id, req.body.vehicles);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStore = async (req, res) => {
    try{
        const store = await storeService.updateStore(req.params.id, req.body);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    saveStore,
    getAllStores,
    getStoreById,
    assingEmployeesToStore,
    assignVehiclesToStore,
    updateStore
}