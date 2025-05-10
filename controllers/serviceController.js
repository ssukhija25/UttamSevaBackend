const Service = require('../models/serviceModel');
const Category = require('../models/categoryModel');
const mongoose = require("mongoose");
// create new service.................................................
const createService = async (req, res) => {
  try {
    const { name, description, price, categoryId, icon_url } = req.body;

    // validation checks..................................................
    if (!name || !description || !price || !categoryId || !icon_url) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, description, price, categoryId, icon_url) are required.',
      });
    }

    // Check if categoryId is valid.............................................
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    // Check if service with the same name already exists.........................
    const existingService = await Service.findOne({ name });      
    if (existingService) {
      return res.status(400).json({
        success: false,
        message: 'Service with this name already exists.',
      });
    }

    // create new service..................................................
    const newService = new Service({ name, description, price, categoryId, icon_url });
    const savedService = await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service: savedService,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all services..................................................
const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('categoryId', 'name');
    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get services by category ID..................................................
const getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // check if category exists...................................
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    // get services by category id..................................................
    const services = await Service.find({ categoryId }).populate('categoryId', 'name');

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createService,
  getServices,
  getServicesByCategory,
};
