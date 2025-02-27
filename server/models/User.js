const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Used to hash passwords

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,  // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Skip hashing if password is not modified

  // Hash the password with 10 rounds of salt
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
