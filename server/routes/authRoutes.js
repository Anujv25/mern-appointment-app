const express = require('express');
const { signup ,login} = require('../controllers/authController');  // Import signup controller
const {verifyOtpMethod,sendOtpMethod} = require('../controllers/otpController');
const router = express.Router();

// Define the route for user signup
router.post('/signup', signup);  // Handle POST requests for signup
router.post('/login',login);
router.post('/send-otp',sendOtpMethod);
router.post('/verify-otp',verifyOtpMethod);

module.exports = router;
