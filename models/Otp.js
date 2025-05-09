const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  otp_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  rating: { type: Number, default: 0 },
  is_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true }
});

module.exports = mongoose.model('Otp', otpSchema);
