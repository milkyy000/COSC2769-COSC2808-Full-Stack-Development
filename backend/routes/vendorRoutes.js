// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require("../config/multer");
const fs = require("fs");
const path = require("path");

// GET all products for a vendor
router.get('/:vendorId/products', async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.params.vendorId });
    res.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  } 
});


// Add product with file upload
router.post("/:vendorId/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // --- Validation ---
    if (!name || name.length < 10 || name.length > 20) {
      if (req.file) fs.unlinkSync(path.join("uploads", req.file.filename));
      return res.status(400).json({ error: "Product name must be 10–20 characters" });
    }
    if (!price || price <= 0) {
      if (req.file) fs.unlinkSync(path.join("uploads", req.file.filename));
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    // --- Create Product ---
    const product = new Product({
      vendor: req.params.vendorId,
      name,
      price,
      description,
      image: req.file ? req.file.filename : null, //only save filename
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    console.error("❌ Failed to add product:", err);

    // cleanup file if error occurs
    if (req.file) {
      try {
        fs.unlinkSync(path.join("uploads", req.file.filename));
      } catch (unlinkErr) {
        console.error("⚠️ Failed to delete file:", unlinkErr);
      }
    }

    res.status(500).json({ error: "Failed to add product" });
  }
});

// PUT update a product (with file upload, only by vendor who owns it)
router.put('/:vendorId/products/:productId', upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // --- Validation ---
    if (!name || name.length < 10 || name.length > 20) {
      if (req.file) fs.unlinkSync(path.join("uploads", req.file.filename));
      return res.status(400).json({ error: "Product name must be 10–20 characters" });
    }
    if (!price || price <= 0) {
      if (req.file) fs.unlinkSync(path.join("uploads", req.file.filename));
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    // --- Find existing product ---
    const existingProduct = await Product.findOne({
      _id: req.params.productId,
      vendor: req.params.vendorId,
    });

    if (!existingProduct) {
      if (req.file) fs.unlinkSync(path.join("uploads", req.file.filename));
      return res.status(404).json({ error: "Product not found or not owned by this vendor" });
    }

    // --- If new image uploaded, remove old one ---
    if (req.file) {
      if (existingProduct.image) {
        try {
          fs.unlinkSync(path.join("uploads", existingProduct.image));
        } catch (unlinkErr) {
          console.error("⚠️ Failed to delete old image:", unlinkErr);
        }
      }
      existingProduct.image = req.file.filename;
    }

    // --- Update other fields ---
    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.description = description;

    await existingProduct.save();
    res.json(existingProduct);

  } catch (err) {
    console.error("❌ Failed to update product:", err);

    // cleanup uploaded file if error happens
    if (req.file) {
      try {
        fs.unlinkSync(path.join("uploads", req.file.filename));
      } catch (unlinkErr) {
        console.error("⚠️ Failed to delete file after error:", unlinkErr);
      }
    }

    res.status(400).json({ error: "Failed to update product" });
  }
});


// DELETE remove a product (only by vendor who owns it + delete image file)
router.delete('/:vendorId/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
      vendor: req.params.vendorId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by this vendor' });
    }

    // --- Delete image file if exists ---
    if (product.image) {
      try {
        const filePath = path.join("uploads", product.image);
        fs.unlinkSync(filePath);
        console.log(`🗑 Deleted image file: ${filePath}`);
      } catch (unlinkErr) {
        console.error("⚠️ Failed to delete image file:", unlinkErr);
      }
    }

    res.json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
