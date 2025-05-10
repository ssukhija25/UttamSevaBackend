const ServiceProvider = require('../models/ServiceProvider');

// GET all service providers ..................................................   
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// GET a single provider by ID....................................................
exports.getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found'
      });
    }
    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// CREATE a new provider.....................................................
exports.createProvider = async (req, res) => {
  try {
    const { provider_id, name, phone_number, email, profile_pic_url, rating, is_verified } = req.body;

    // Validate required fields
    if (!provider_id || !name || !phone_number || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newProvider = new ServiceProvider({
      provider_id,
      name,
      phone_number,
      email,
      profile_pic_url,
      rating,
      is_verified,
      created_at: new Date()
    });

    await newProvider.save();
    res.status(201).json({
      success: true,
      message: 'Provider created successfully',
      data: newProvider
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// UPDATE a provider......................................................................
exports.updateProvider = async (req, res) => {
  try {
    const updatedProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProvider) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Provider updated successfully',
      data: updatedProvider
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

// DELETE a provider.............................................................
exports.deleteProvider = async (req, res) => {
  try {
    const deletedProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) {
      return res.status(404).json({
        success: false,
        message: 'Service provider not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Provider deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};
