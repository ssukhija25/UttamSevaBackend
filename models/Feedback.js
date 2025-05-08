const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedback_id: { type: String, required: true },
  booking_id: { type: String, required: true },
  user_id: { type: String, required: true },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
