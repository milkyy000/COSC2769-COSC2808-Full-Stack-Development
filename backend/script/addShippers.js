require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Shipper = require('../models/Shipper');
const DistributionHub = require('../models/DistributionHub');

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Create hashed password
    const passwordHash = await bcrypt.hash('defaultPassword123', 10);

    // Find distribution hubs by name
    const centralHub = await DistributionHub.findOne({ name: 'Central Hub' });
    const eastHub = await DistributionHub.findOne({ name: 'East Hub' });
    const westHub = await DistributionHub.findOne({ name: 'West Hub' });

    if (!centralHub || !eastHub || !westHub) {
      throw new Error('One or more distribution hubs are missing in DB.');
    }

     const shipperUsers = await User.insertMany([
      { username: 'speed_ship', passwordHash, profilePicture: 'ship.png', role: 'shipper' },
      { username: 'quick_logistics', passwordHash, profilePicture: null, role: 'shipper' },
      { username: 'global_freight', passwordHash, profilePicture: 'freight.png', role: 'shipper' }
    ]);

    // Link shippers to hubs
   const shipperDocs = [
      { user: shipperUsers[0]._id, distributionHub: centralHub._id },
      { user: shipperUsers[1]._id, distributionHub: eastHub._id },
      { user: shipperUsers[2]._id, distributionHub: westHub._id }
    ];

    await Shipper.insertMany(shipperDocs);
    console.log('Shippers inserted!');
  } catch (err) {
    console.error('Error inserting shippers:', err);
  } finally {
    await mongoose.connection.close();
  }
}

main();
