const mongoose = require('mongoose');

// Service provider schema.................................................................
const serviceProviderSchema = new mongoose.Schema({
  provider_id: { 
    type: String, 
    required: true, 
    unique: true,
  },
  name: { 
    type: String, 
    required: true 
  },
  phone_number: { 
    type: String, 
    required: true, 
    ref:"Otp"
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  profile_pic_url: { 
    type: String, 
    default: null 
  },
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  is_verified: { 
    type: Boolean, 
    default: false 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Create an index........................................................................
// This will help in faster searches based on provider_id and email
serviceProviderSchema.index({ provider_id: 1 });
serviceProviderSchema.index({ email: 1 });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
