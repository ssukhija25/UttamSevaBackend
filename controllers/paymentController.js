const Payment = require('../models/Payment');
const { instance } = require('../config/razorpay');
const crypto = require('crypto');

// Create Payment and Generate Razorpay Order.....................................................
exports.createPayment = async (req, res) => {
  try {
    const {
      userId,
      location,
      paymentMethod,
      price,
      tax,
      discountPercentage,
      advanceDiscountPercentage
    } = req.body;

    // Calculations....................................................................
    const subtotal = price + tax;
    const discountAmount = (discountPercentage / 100) * subtotal;
    const totalAmount = subtotal - discountAmount;
    const advanceDiscountAmount = (advanceDiscountPercentage / 100) * totalAmount;
    const remainingAmount = totalAmount - advanceDiscountAmount;

    // Razorpay Order Creation..............................................................
    const amountInPaise = Math.round(totalAmount * 100);
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };
    const razorpayOrder = await instance.orders.create(options);

    // Save Payment..........................................................
    const payment = new Payment({
      userId,
      location,
      paymentMethod,
      amountDetails: {
        price,
        tax,
        discountPercentage,
        discountAmount,
        subtotal,
        totalAmount,
        advanceDiscountPercentage,
        advanceDiscountAmount,
        remainingAmount
      },
      razorpayOrderId: razorpayOrder.id,
      status: 'Pending'
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      orderId: razorpayOrder.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: amountInPaise
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error: error.message });
  }
};

// Verify Razorpay Payment....................................................................
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Update Payment Record.................................................................
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: 'Paid',
        paymentVerifiedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Payment verified', payment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
  }
};

// Get All Payments.......................................................................
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

// Get Payments by User.............................................................
exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user payments', error });
  }
};
