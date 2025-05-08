const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create Razorpay Order & Save Payment
router.post('/', paymentController.createPayment);

// Verify Razorpay Payment
router.post('/verify', paymentController.verifyPayment);

// Admin - Get All Payments
router.get('/', paymentController.getAllPayments);

// Get User Payments
router.get('/user/:userId', paymentController.getPaymentsByUser);

module.exports = router;
