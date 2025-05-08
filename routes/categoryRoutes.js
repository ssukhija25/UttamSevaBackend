const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/allCategories", getCategories);
router.post("/create", createCategory);
module.exports = router;
