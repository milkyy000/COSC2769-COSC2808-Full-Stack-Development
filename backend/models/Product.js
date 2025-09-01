// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: {
    type: String,
    required: true,
    minlength: 10, 
    maxlength: 20
  },
  price: { type: Number, required: true, min: 1 }, 
  image: String,
  description: { type: String, maxlength: 500 }
});


module.exports = mongoose.model('Product', productSchema);