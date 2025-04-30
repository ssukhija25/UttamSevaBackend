const Notification = require('../models/notification.model');

// get all notifications..........................................
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get notifications user.......................................
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user_id: userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// mark notification read..............................................
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { is_read: true });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create notification..............................................
const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {  
  getAllNotifications,
  getUserNotifications,
  markAsRead,
  createNotification
};