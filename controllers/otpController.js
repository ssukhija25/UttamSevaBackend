const Otp = require('../models/Otp');
const { v4: uuidv4 } = require('uuid');

// Utility: Generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp_code = generateOtp();
    const id = `otp-${uuidv4()}`;
    const created_at = new Date();
    const expires_at = new Date(created_at.getTime() + 5 * 60000); // 5 mins

    const otp = new Otp({ id, otp_code, phone_number, created_at, expires_at });
    await otp.save();

    // In production, send OTP via SMS here
    console.log(`OTP for ${phone_number}: ${otp_code}`);

    res.status(201).json({ message: 'OTP sent', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { id, otp_code } = req.body;

    const otpEntry = await Otp.findOne({ id });

    if (!otpEntry) {
      return res.status(404).json({ error: 'OTP not found' });
    }

    if (otpEntry.expires_at < new Date()) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    if (otpEntry.otp_code !== otp_code) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    otpEntry.is_verified = true;
    await otpEntry.save();

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
};
