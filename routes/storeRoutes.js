const express = require('express');
const storeController = require('../controllers/storeController');

const router = express.Router();

router.post('/', storeController.saveStore);
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);

module.exports = router;