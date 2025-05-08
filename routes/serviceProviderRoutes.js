const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceProviderController');

router.get('/allProviders', controller.getAllProviders);
router.get('/:id', controller.getProviderById);
router.post('/createProviders', controller.createProvider);
router.put('/:id', controller.updateProvider);
router.delete('/:id', controller.deleteProvider);

module.exports = router;
