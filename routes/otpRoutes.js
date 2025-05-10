const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

router.post('/generate-otp', otpController.sendOtp);
router.post('/verify-otp', otpController.verifyOtp);

module.exports = router;
