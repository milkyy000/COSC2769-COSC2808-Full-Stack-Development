// addVendor.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

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

    try {
      const user = await User.create(
        [
          {
            username: 'vendorUser2',
            passwordHash: 'hashedpassword123',
            role: 'vendor',
          },
        ],
        { session }
      );

      const vendor = await Vendor.create(
        [
          {
            user: user[0]._id,
            businessName: 'Data Inc.',
            businessAddress: '121 Main Street, HCMC',
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
