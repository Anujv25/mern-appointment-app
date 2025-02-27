const express = require('express');
const { signup ,login} = require('../controllers/authController');  // Import signup controller

const router = express.Router();

// Define the route for user signup
router.post('/signup', signup);  // Handle POST requests for signup
router.post('/login',login);

module.exports = router;
