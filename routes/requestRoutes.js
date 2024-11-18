const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.post('/', requestController.save);
router.get('/', requestController.getAllRequests);
router.delete('/:id', requestController.deleteRequest);
router.get('/requestsByStore/:storeId', requestController.getRequestsByStoreId);

module.exports = router;