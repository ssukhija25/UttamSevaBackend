const express = require("express");
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const notificationRoutes = require("./notification.routes")
const serviceRoutes = require("./serviceRoutes")
const paymentRoutes = require("./paymentRoutes");
const bookingRoutes = require("./bookingRoutes");
const feedbackRoutes = require("./feedbackRoutes");
const serviceProvider = require("./serviceProviderRoutes")
const addressRoutes = require("./addressRoutes")



const mainRoute = express.Router();
mainRoute.use(categoryRoutes);
mainRoute.use(userRoutes);
mainRoute.use(notificationRoutes);
mainRoute.use(serviceRoutes);
mainRoute.use(paymentRoutes);
mainRoute.use(bookingRoutes);
mainRoute.use(feedbackRoutes);
mainRoute.use(serviceProvider);
mainRoute.use(addressRoutes);

mainRoute.get("/api/mainpage", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRoute;
