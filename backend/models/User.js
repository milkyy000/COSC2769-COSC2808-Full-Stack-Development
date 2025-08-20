const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    minlength: 8,  // ✅ spec: min length 8
    maxlength: 15, 
    match: /^[A-Za-z0-9]+$/ // ✅ spec: only letters & digits
  },
  passwordHash: { type: String, required: true },
  profilePicture: String,
  role: { 
    type: String, 
    enum: ['customer', 'vendor', 'shipper'], 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);
