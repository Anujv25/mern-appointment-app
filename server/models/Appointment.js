const mongoose = require('mongoose');

// Define the appointment schema 
const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,  // Each appointment must be linked to a user
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date, // You can use Date to store both date and time
    required: true,
  },
  endTime: {
    type: Date, // You can use Date to store both date and time
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  favourite:{
    type:Boolean,
    default:false
  }
});

// Create the Appointment model
const Appointments = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointments;
