const connectDB = require('../config/db');
const { addCustomer } = require('../controllers/customerController');

(async () => {
  try {
    await connectDB();
    const newCustomer = await addCustomer({
      username: 'baotoan1',
      password: 'mypassword',
      role:'' ,
      name: '',
      address: '123 Main St'
    });
    console.log('✅ Customer added:', newCustomer);
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
