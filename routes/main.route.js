const express = require("express");
const categoryRoutes = require("./categoryRoutes")
const userRoutes = require("./userRoutes")
const notificationRoutes = require("./notification.routes")
const serviceRoutes = require("./serviceRoutes")


const mainRoute = express.Router();
mainRoute.use(categoryRoutes);
mainRoute.use(userRoutes);
mainRoute.use(notificationRoutes);
mainRoute.use(serviceRoutes);

mainRoute.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRoute;
