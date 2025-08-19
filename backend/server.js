// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: S4070049

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const { User, Customer, Vendor, Shipper, DistributionHub, Product, ShoppingCart, Order } = require('./models');

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Vite default port
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));
//----------------------------------------
// Multer setup (for future file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });
//----------------------------------------

// Default profile picture path
const defaultProfile = path.join(__dirname, 'assets/profileIMG.png');

//----------------------------------------
// Vendor Registration Route
//----------------------------------------
app.post('/api/vendors/register', async (req, res) => {
    try {
        const { username, password, businessName, businessAddress } = req.body;

        if (!username || !password || !businessName || !businessAddress) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for duplicate username
        const existing = await Vendor.findOne({ username });
        if (existing) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Ensure uploads folder exists
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

        // Copy default profile image if not exists
        const uploadPath = path.join(uploadDir, 'profileIMG.png');
        const defaultProfile = path.join(__dirname, 'assets/profileIMG.png');
        if (!fs.existsSync(uploadPath)) fs.copyFileSync(defaultProfile, uploadPath);

        // Default profile path to save in DB
        const profilePicturePath = '/uploads/profileIMG.png';

        // Save vendor
        const newVendor = new Vendor({
            username,
            password,
            businessName,
            businessAddress,
            profilePicture: profilePicturePath,
        });

        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully!", vendor: newVendor });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//----------------------------------------
// Start server
//----------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
