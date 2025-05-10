const Address = require('../models/Address');
const mongoose = require('mongoose');

// Create address
exports.createAddress = async (req, res) => {
  try {
    const { userId, addressLine1, addressLine2, city, state, zipCode, country, isDefault, label } = req.body;

    // Validate required fields
    if (!userId || !addressLine1 || !city || !state || !zipCode || !country) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, addressLine1, city, state, zipCode, country are required.'
      });
    }

    // Directly create and save the address without checking User
    const address = new Address({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || false,
      label: label || 'Home'
    });

    await address.save();

    res.status(201).json({
      success: true,
      message: 'Address created successfully',
      address
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create address',
      details: error.message
    });
  }
};

// Get all addresses by user ID
exports.getAddressesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.'
      });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    if (addresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No addresses found for this user.'
      });
    }

    res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch addresses',
      details: error.message
    });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid address ID.'
      });
    }

    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      address: updatedAddress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update address',
      details: error.message
    });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid address ID.'
      });
    }

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete address',
      details: error.message
    });
  }
};
