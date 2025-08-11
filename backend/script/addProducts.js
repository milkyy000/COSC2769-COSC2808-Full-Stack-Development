const Product = require('../models/Product');
require('dotenv').config({ path: __dirname + '/../.env' });
// Connect to MongoDB
const mongoose = require('mongoose');


async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
}


const product1 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ea', 
    name: 'Product 1',
    price: 19.99,
    image: 'https://example.com/product1.jpg',
    description: 'Description for Product 1'
});
product1.save()
    .then(() => console.log('Product 1 added'))
    .catch(err => console.error('Error adding Product 1:', err));

const product2 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7eb',
    name: 'Product 2',
    price: 29.99,
    image: 'https://example.com/product2.jpg',
    description: 'Description for Product 2'
});
product2.save()
    .then(() => console.log('Product 2 added'))
    .catch(err => console.error('Error adding Product 2:', err));

const product3 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ea',
    name: 'Product 3',
    price: 39.99,
    image: 'https://example.com/product3.jpg',
    description: 'Description for Product 3'
});
product3.save()
    .then(() => console.log('Product 3 added'))
    .catch(err => console.error('Error adding Product 3:', err));

const product4 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7eb',
    name: 'Product 4',
    price: 49.99,
    image: 'https://example.com/product4.jpg',
    description: 'Description for Product 4'
});
product4.save()
    .then(() => console.log('Product 4 added'))
    .catch(err => console.error('Error adding Product 4:', err));

const product5 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ec',
    name: 'Product 5',
    price: 59.99,
    image: 'https://example.com/product5.jpg',
    description: 'Description for Product 5'
});
product5.save()
    .then(() => console.log('Product 5 added'))
    .catch(err => console.error('Error adding Product 5:', err));

const product6 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ed',
    name: 'Product 6',
    price: 69.99,
    image: 'https://example.com/product6.jpg',
    description: 'Description for Product 6'
});
product6.save()
    .then(() => console.log('Product 6 added'))
    .catch(err => console.error('Error adding Product 6:', err));

const product7 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ee',
    name: 'Product 7',
    price: 79.99,
    image: 'https://example.com/product7.jpg',
    description: 'Description for Product 7'
});
product7.save()
    .then(() => console.log('Product 7 added'))
    .catch(err => console.error('Error adding Product 7:', err));

const product8 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ef',
    name: 'Product 8',
    price: 89.99,
    image: 'https://example.com/product8.jpg',
    description: 'Description for Product 8'
}); 
product8.save()
    .then(() => console.log('Product 8 added'))
    .catch(err => console.error('Error adding Product 8:', err));

const product9 = new Product({
    vendor: '64f0c1e2f1d2e3a4b5c6d7ef',
    name: 'Product 9',
    price: 99.99,
    image: 'https://example.com/product9.jpg',
    description: 'Description for Product 9'
});
product9.save()
    .then(() => console.log('Product 9 added'))
    .catch(err => console.error('Error adding Product 9:', err));

main();