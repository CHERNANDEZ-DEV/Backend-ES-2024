const storeRepository = require('../repositories/storeRepository');

const saveStore = async (storeData) => {
    return storeRepository.saveStore(storeData);
};

const getAllStores = async () => {
    return storeRepository.findAllStores();
};

const getStoreById = async (storeId) => {
    const store = await storeRepository.findStoreById(storeId);
    return  store;
};

const assingEmployeesToStore = async (storeId, employeeIds) => {
    const store = await storeRepository.findStoreById(storeId);
    store.employees.push(...employeeIds);
    return store.save();
};

const assignVehiclesToStore = async (storeId, vehicleIds) => {
    const store = await storeRepository.findStoreById(storeId);
    store.vehicles.push(...vehicleIds);
    return store.save();
};

module.exports = {
    saveStore,
    getAllStores,
    getStoreById,
    assingEmployeesToStore
};