const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  distributionHub: { type: Schema.Types.ObjectId, ref: 'DistributionHub', required: true }
});

module.exports = mongoose.model('Shipper', shipperSchema);