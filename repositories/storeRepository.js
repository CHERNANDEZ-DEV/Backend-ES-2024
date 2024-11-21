const Store = require('../models/Store');

const saveStore = async(storeData) => {
    const store = new Store(storeData);
    return store.save();
};

const findAllStores = async () => {
    return Store.find().populate('employees').populate('vehicles');
};

const findStoreById = async (storeId) => {
   const store = await Store.findById(storeId).populate('employees').populate('vehicles');   
    return store;
};

const updateStore = async (storeId, storeData) => {
    const store = await Store.findByIdAndUpdate(storeId, storeData, {new: true});   
    return store;
}

const deleteStore = async (storeId) => {
    return await Store.findByIdAndDelete(storeId);
};

module.exports = {
    saveStore,
    findAllStores,
    findStoreById, 
    updateStore,
    deleteStore
};