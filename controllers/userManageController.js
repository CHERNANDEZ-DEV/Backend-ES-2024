const userManageService = require('../services/userManageService');

const updateUser = async (req, res) => {
    try {
        const user = await userManageService.updateUser(req.params.id ,req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userManageService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userManageService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers
}