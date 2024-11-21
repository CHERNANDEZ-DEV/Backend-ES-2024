const express = require('express');
const storeController = require('../controllers/storeController');

const router = express.Router();

router.post('/', storeController.saveStore);
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.put('/:id', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

module.exports = router;