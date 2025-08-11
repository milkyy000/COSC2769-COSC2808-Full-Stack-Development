const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);