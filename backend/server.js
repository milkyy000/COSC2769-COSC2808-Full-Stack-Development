// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Vite default port
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 1000*60*60 },
  })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

//-----------------------------------------------------------------------------------------------------
//Routers//
//-----------------------------------------------------------------------------------------------------
const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes);

const vendorRoutes = require('./routes/vendorRoutes');
app.use('/api/vendors', vendorRoutes);

//=====================================================================================================
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
