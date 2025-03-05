const express = require('express');
const { signup ,login,resetPassword} = require('../controllers/authController');  // Import signup controller
const {verifyOtpMethod,sendOtpMethod,} = require('../controllers/otpController');


// add user id middleware
const {addUserId} = require('../middleware/addUserId');
const router = express.Router();

// Define the route for user signup
router.post('/signup', signup);  // Handle POST requests for signup
router.post('/login',login);
router.post('/send-otp',sendOtpMethod);
router.post('/verify-otp',verifyOtpMethod);
router.put('/reset-password',addUserId,resetPassword);

module.exports = router;
