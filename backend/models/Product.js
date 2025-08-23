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