const User = require('../models/User');  // Import the User model
const jwt = require('jsonwebtoken');  // For generating JWT token
const bcrypt = require('bcryptjs');  // For comparing passwords

// Signup controller function
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });  // If user exists, throw error
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token after successful signup
    const token = jwt.sign({ id: newUser._id },"KFPxzFa1bx", {
      expiresIn: '1h',  // Token expiration time
    });

    // Respond with success message and token
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup };
