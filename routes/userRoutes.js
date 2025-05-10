const express = require("express");
const {
  getUsers,
  createUser,
  loginUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/users", getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;
