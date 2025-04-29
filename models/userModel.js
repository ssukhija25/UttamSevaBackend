const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    // i add password to the user model
    // to store the hashed password
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
