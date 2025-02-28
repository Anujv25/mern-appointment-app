const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
