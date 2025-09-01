// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  distributionHub: { type: Schema.Types.ObjectId, ref: 'DistributionHub', required: true }
});

module.exports = mongoose.model('Shipper', shipperSchema);