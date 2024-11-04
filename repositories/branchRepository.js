const Branch = require('../models/Branch');

const saveBranch = async(branch) => {
    return branch.save();
};

const findAllBranches = async () => {
    return await Branch.find();
};

const findBranchById = async (branchId) => {
    return Branch.findById(branchId).populate('employees');
}

module.exports = {
    createBranch,
    findAllBranches,
    findBranchById
};