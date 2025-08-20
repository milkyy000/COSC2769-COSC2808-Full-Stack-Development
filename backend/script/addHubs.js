require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const DistributionHub = require('../models/DistributionHub');

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const hubs = [
      { name: 'Central Hub', address: '10 Logistics Ave' },
      { name: 'East Hub', address: '22 Shipping Blvd' },
      { name: 'West Hub', address: '55 Cargo Road' }
    ];

    await DistributionHub.insertMany(hubs);
    console.log('Distribution hubs inserted!');
  } catch (err) {
    console.error('Error inserting hubs:', err);
  } finally {
    await mongoose.connection.close();
  }
}

main();
