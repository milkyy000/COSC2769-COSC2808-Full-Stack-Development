// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const multer = require('multer');
const path = require('path');

// file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Vendor registration
router.post('/register', upload.single('profilePicture'), vendorController.registerVendor);

// Vendor products
router.get('/:vendorId/products', vendorController.getVendorProducts);

// Add new product
router.post('/:vendorId/products', upload.single('image'), vendorController.addProduct);

module.exports = router;
