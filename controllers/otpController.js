const Otp = require('../models/Otp');
const { v4: uuidv4 } = require('uuid');
const twilio = require("twilio");

// Utility: Generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send OTP
exports.sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log("HLO")
  if (!phoneNumber) return res.status(400).json({ message: "Phone number is required" });

  try {
      const verification = await client.verify.v2
          .services(process.env.TWILIO_VERIFY_SERVICE_SID)
          .verifications.create({
            body: 'Uttamseva otp',
              channel: "sms", // Use "sms" for text message, "call" for voice call, "email" for email
              to: `+91${phoneNumber}`,
          });

      res.status(200).json({ message: "OTP sent successfully", sid: verification.sid });
  } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
 const { phoneNumber, otp } = req.body;
 if (!phoneNumber || !otp) return res.status(400).json({ message: "Phone number and OTP are required" });

    try {
        const verificationCheck = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({
              code: `${otp}`,
                to: `+91${phoneNumber}`,
            });

        if (verificationCheck.status === "approved") {
            res.status(200).json({ message: "OTP verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
};
