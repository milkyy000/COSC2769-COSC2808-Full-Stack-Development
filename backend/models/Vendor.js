const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true, unique: true, minlength: 5 },
  businessAddress: { type: String, required: true, unique: true, minlength: 5 }
});

module.exports = mongoose.model('Vendor', vendorSchema);