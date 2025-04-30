const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notification_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
