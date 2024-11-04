const branchRepository = require('../repositories/branchRepository');

const createBranch = async (branchData) => {
    return await branchRepository.createBranch(branchData);
};

const getAllBranches = async () => {
    return await branchRepository.findAllBranches();
};

const getBranchById = async (branchId) => {
    const branch = await branchRepository.findBranchById(branchId);
    if(!branch){
        throw new Error('Branch not found');
    }
    return branch;
};

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById
};

