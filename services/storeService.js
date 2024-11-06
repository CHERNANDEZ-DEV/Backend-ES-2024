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

module.exports = {
    saveStore,
    getAllStores,
    getStoreById
};