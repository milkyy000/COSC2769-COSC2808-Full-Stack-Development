// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ✅ GET all products for a vendor
router.get('/:vendorId/products', async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.params.vendorId });
    res.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ✅ POST add a new product for a vendor
router.post('/:vendorId/products', async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    // Validation (basic, server-side)
    if (!name || name.length < 10 || name.length > 20) {
      return res.status(400).json({ error: 'Product name must be 10–20 characters' });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const product = new Product({
      vendor: req.params.vendorId,
      name,
      price,
      description,
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Failed to add product:', err);
    res.status(400).json({ error: 'Failed to add product' });
  }
});

// ✅ PUT update a product (only by vendor who owns it)
router.put('/:vendorId/products/:productId', async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId, vendor: req.params.vendorId }, // ensure vendor owns product
      { name, price, description, image },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by this vendor' });
    }

    res.json(product);
  } catch (err) {
    console.error('❌ Failed to update product:', err);
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// ✅ DELETE remove a product (only by vendor who owns it)
router.delete('/:vendorId/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
      vendor: req.params.vendorId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by this vendor' });
    }

    res.json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});
module.exports = router;
