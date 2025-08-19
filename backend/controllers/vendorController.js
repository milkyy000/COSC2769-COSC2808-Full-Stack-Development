// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const path = require('path');

// Register vendor
exports.registerVendor = async (req, res) => {
  try {
    const { username, password, businessName, businessAddress } = req.body;

    // validation
    if (!username || !password || !businessName || !businessAddress) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      username,
      passwordHash: hashedPassword,
      role: 'vendor',
      profilePicture: req.file ? req.file.filename : null
    });
    await newUser.save();

    // Create Vendor
    const newVendor = new Vendor({
      user: newUser._id,
      businessName,
      businessAddress
    });
    await newVendor.save();

    res.status(201).json({ message: 'Vendor registered successfully', vendor: newVendor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// View My Products
exports.getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const products = await Product.find({ vendor: vendorId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add New Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const vendorId = req.params.vendorId;

    if (!name || !price || !description) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const newProduct = new Product({
      vendor: vendorId,
      name,
      price,
      description,
      image: req.file ? req.file.filename : null
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};
