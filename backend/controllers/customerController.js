const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Customer = require('../models/Customer');

async function addCustomer(data) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const role = User.schema.path('role').enumValues.find(r => r === 'customer');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = new User({
            username: data.username,
            passwordHash: hashedPassword,
            role
        });
        const customer = new Customer({
            user: user._id,
            name: data.name,
            address: data.address
        });

        await user.save({session});
        await customer.save({session});
        await session.commitTransaction();
        session.endSession();
        return { user, customer };

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log("ERROR ADDING CUSTOMER" + err.message);
        throw err;
    }
}

module.exports = { addCustomer };
