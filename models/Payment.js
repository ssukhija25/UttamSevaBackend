const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  location: {
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true }
  },

  paymentMethod: {
    type: String,
    enum: ['MasterCard', 'Visa', 'Paypal', 'Digital Pay', 'Razorpay'],
    required: true
  },

  amountDetails: {
    price: { type: Number, required: true },
    tax: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    advanceDiscountPercentage: { type: Number, default: 0 },
    advanceDiscountAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, required: true }
  },

  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  paymentVerifiedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
