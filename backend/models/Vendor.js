// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true, unique: true, minlength: 5 },
  businessAddress: { type: String, required: true, unique: true, minlength: 5 }
});

module.exports = mongoose.model('Vendor', vendorSchema);