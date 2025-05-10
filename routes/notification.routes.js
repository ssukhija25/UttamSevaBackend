const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");

router.get("/all", controller.getAllNotifications);
router.get("/user/:userId", controller.getUserNotifications);
router.post("/createNotification", controller.createNotification);
router.put("/mark-read/:id", controller.markAsRead);

module.exports = router;
