const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {  
  });
  console.log('✅ Connected to MongoDB');
}

module.exports = connectDB;