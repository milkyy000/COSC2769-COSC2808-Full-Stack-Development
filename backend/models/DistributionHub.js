const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributionHubSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('DistributionHub', distributionHubSchema);