const Store = require('../models/Store');

const saveStore = async(storeData) => {
    const store = new Store(storeData);
    return store.save();
};

const findAllStores = async () => {
    return Store.find().populate('employees');
};

const findStoreById = async (storeId) => {
   const store = await Store.findById(storeId).populate('employees');   
    return store;
}

module.exports = {
    saveStore,
    findAllStores,
    findStoreById
};