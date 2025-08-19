// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")
const session = require("express-session");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true   })); // Vite default port
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
app.use("/api/auth", authRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error(err));

//-----------------------------------------------------------------------------------------------------


app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
