const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: String,
  description: String
});

module.exports = mongoose.model('Product', productSchema);