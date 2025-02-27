// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies




// Database connection
mongoose.connect("mongodb+srv://Anuj:F85HuqMp1tXkDWis@appointmentapp.trtnl.mongodb.net/?retryWrites=true&w=majority&appName=AppointmentApp",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


// import user schema
const User = require('./models/userModel');
async function insert(){
  await User.create({name:"Anuj",email:"anujvwork2020@gmail.com"})
}
insert();
// Sample route
app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
