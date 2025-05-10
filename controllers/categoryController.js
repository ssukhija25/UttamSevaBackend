const Category = require('../models/categoryModel');
const { v4: uuidv4 } = require('uuid'); 

const createCategory = async (req, res) => {
  try {
    const { name, description, icon_url } = req.body;

    if (!name || !description || !icon_url) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // check exist or not.........................................................
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category name already exists' });
    }

    // generate a unique id for the category........................................
    const categoryId = uuidv4();

    const newCategory = new Category({
      categoryId,
      name,
      description,
      icon_url,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, category: savedCategory });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories
};
