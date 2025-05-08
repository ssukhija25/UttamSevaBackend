const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/craeteAddress', addressController.createAddress);

router.get('/user/:userId', addressController.getAddressesByUser);

router.put('/:id', addressController.updateAddress);

router.delete('/:id', addressController.deleteAddress);

module.exports = router;
