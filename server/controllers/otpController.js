const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Store the OTP temporarily (in-memory or a DB, here we use an object as an example)
let otpStore = {};  // In-memory storage for OTPs, could be replaced by DB for production

// Email setup using Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'apikey', // Always 'apikey' for SendGrid
    pass: "", // The API key you generated in SendGrid
  },
});

// Function to send OTP to the user's email
const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: 'anuj.vgithub25@gmail.com',  // Sender address
    to: email,                    // Recipient address
    subject: 'Your OTP for Email Verification',
    text: `Your OTP is: ${otp}`,   // OTP in the email body
  };

  return transporter.sendMail(mailOptions);
};

// Generate OTP and send to the user's email
const generateAndSendOtp = (email) => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

  // Store OTP temporarily with an expiration time (5 minutes in this case)
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  return sendOtpEmail(email, otp)
    .then(() => {
      return { message: 'OTP sent to email' };
    })
    .catch((error) => {
      throw new Error('Failed to send OTP email: ' + error.message);
    });
};

// Function to verify OTP
const verifyOtp = (email, otp) => {
  const otpData = otpStore[email];

  if (!otpData) {
    throw new Error('OTP not found or expired');
  }

  if (Date.now() > otpData.expiresAt) {
    throw new Error('OTP has expired');
  }

  if (otpData.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  // OTP matched and is valid
  return { message: 'OTP verified successfully' };
};


const sendOtpMethod=async (req, res)=>{
    const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const result = await generateAndSendOtp(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const verifyOtpMethod=async (req, res)=>{

    const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const result = verifyOtp(email, otp);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}








module.exports = {
    sendOtpMethod,verifyOtpMethod
};
