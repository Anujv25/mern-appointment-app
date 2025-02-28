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
    const token = jwt.sign({ id: newUser._id },process.env.jwtSecret, {
      expiresIn: '1h',  // Token expiration time
    });

    // Respond with success message and token
    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller function

const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await
        User.findOne({email});  // Find user with the email

        if(user && (await user.matchPassword(password))){
            const token=jwt.sign({id:user._id},process.env.jwtSecret,{expiresIn:'1h'});  // Generate JWT token
            res.json({message:'User logged in successfully',token});  // Respond with success message and token
        }else{
            res.status(401).json({message:'Invalid credentials'});  // Throw error if credentials are invalid
        }
    } 

    catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});  // Throw error if server error
    }
}
module.exports = { signup,login };
