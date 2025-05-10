const express = require('express');
const router = express.Router();
const {
  createService,
  getServices,
  getServicesByCategory,
} = require('../controllers/serviceController');

router.post('/createService', createService);
router.get('/allService', getServices);
router.get('/category/:categoryId', getServicesByCategory);

module.exports = router;
