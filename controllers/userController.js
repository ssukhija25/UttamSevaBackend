const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config(); 
const JWT_SECRET = process.env.JWT_SECRET;

// generate JWT token.................................
const generateToken = (userId) => {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not set");
  }

  try {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '2d' });
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Check all users aggest................................
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create user..............................................
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      // user: { id: newUser._id, name, email },
      token
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// login user..........................................
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      // user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, createUser, loginUser };
