const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
