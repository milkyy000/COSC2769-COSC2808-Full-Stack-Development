// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 } // snapshot price
});

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  distributionHub: { type: Schema.Types.ObjectId, ref: 'DistributionHub', required: true },
  status: { type: String, enum: ['active', 'delivered', 'canceled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  items: [orderItemSchema]
});



module.exports = mongoose.model('Order', orderSchema);