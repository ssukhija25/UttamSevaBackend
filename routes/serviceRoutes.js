const express = require('express');
const router = express.Router();
const {
  createService,
  getServices,
  getServicesByCategory,
} = require('../controllers/serviceController');

router.post('/', createService);
router.get('/', getServices);
router.get('/category/:categoryId', getServicesByCategory);

module.exports = router;
