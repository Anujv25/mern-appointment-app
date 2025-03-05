const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes
const appointmentRoutes = require('./routes/appointmentRoutes');  // Import the appointment routes
dotenv.config();  // Load environment variables

//swagger tool for api documentation


const app = express();
const PORT = process.env.PORT || 5000;


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Appointments API',
      version: '1.0.0',
      description: 'API documentation for appointment management',
    },
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Path to your route files
};



// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON request bodies
console.log("URI",process.env.MONGODB_URI);
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Use the authentication routes
app.use('/api/auth', authRoutes);  // Prefix the routes with /api/auth
app.use('/api', appointmentRoutes); 










// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

