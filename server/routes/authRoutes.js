const express = require('express');
const { signup } = require('../controllers/authController');  // Import signup controller

const router = express.Router();

// Define the route for user signup
router.post('/signup', signup);  // Handle POST requests for signup

module.exports = router;
