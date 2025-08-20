// require('dotenv').config({ path: __dirname + '/../.env' });
// const mongoose = require('mongoose');
// const DistributionHub = require('../models/DistributionHub');

// async function main() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('Connected to MongoDB');

//     const hubs = [
//       { name: 'Central Hub', address: '10 Logistics Ave' },
//       { name: 'East Hub', address: '22 Shipping Blvd' },
//       { name: 'West Hub', address: '55 Cargo Road' }
//     ];

//     await DistributionHub.insertMany(hubs);
//     console.log('Distribution hubs inserted!');
//   } catch (err) {
//     console.error('Error inserting hubs:', err);
//   } finally {
//     await mongoose.connection.close();
//   }
// }

// main();

// seedDistributionHub.js
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const DistributionHub = require('../models/DistributionHub');

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Provinces same as frontend select list
    const hubs = [
      { name: 'Ha Noi', address: 'Ha Noi city center' },
      { name: 'Ho Chi Minh', address: 'Ho Chi Minh city center' },
      { name: 'Đa Nang', address: 'Da Nang city center' },
      { name: 'Hai Phong', address: 'Hai Phong city center' },
      { name: 'Can Tho', address: 'Can Tho city center' },
      { name: 'Hue', address: 'Hue city center' },
      { name: 'Nha Trang', address: 'Nha Trang city center' }
    ];

    await DistributionHub.deleteMany(); // clear old hubs to avoid duplicates
    await DistributionHub.insertMany(hubs);

    console.log('Distribution hubs inserted!');
  } catch (err) {
    console.error('Error inserting hubs:', err);
  } finally {
    await mongoose.connection.close();
  }
}

main();

