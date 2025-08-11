const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  passwordHash: { type: String, required: true },
  profilePicture: String,
  role: { type: String, enum: ['customer', 'vendor', 'shipper'], required: true }
});

module.exports = mongoose.model('User', userSchema);
