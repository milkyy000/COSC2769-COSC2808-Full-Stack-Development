// addVendor.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
dotenv.config();

const User = require('./models/User');
const Vendor = require('./models/Vendor');

async function addUserAndVendor() {
  try {
    // ✅ Connect first
    console.log('Mongo URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // ✅ Then start session
    const session = await mongoose.startSession();
    session.startTransaction();
    const hashedPassword = await bcrypt.hash("VendorPassword123!", 10);
    try {
      const user = await User.create(
        [
          {
            username: 'vendorUser3',
            passwordHash: hashedPassword,
            role: 'vendor',
          },
        ],
        { session }
      );

      const vendor = await Vendor.create(
        [
          {
            user: user[0]._id,
            businessName: 'Data3 Inc.',
            businessAddress: '123 Main Street, HCMC',
          },
        ],
        { session }
      );

      await session.commitTransaction();
      console.log('✅ Transaction committed:', { user, vendor });
    } catch (err) {
      await session.abortTransaction();
      console.error('❌ Transaction aborted:', err);
    } finally {
      session.endSession();
    }
  } catch (connErr) {
    console.error('❌ MongoDB connection failed:', connErr);
  } finally {
    await mongoose.disconnect();
  }
}

addUserAndVendor();
