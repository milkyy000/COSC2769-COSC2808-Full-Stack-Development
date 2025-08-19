// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  passwordHash: { type: String, required: true },
  profilePicture: String,
  role: { type: String, enum: ['customer', 'vendor', 'shipper'], required: true }
});

module.exports = mongoose.model('User', userSchema);
