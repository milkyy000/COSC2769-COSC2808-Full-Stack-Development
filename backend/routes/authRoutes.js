// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const express = require("express");
const router = express.Router();
const {register, login, logout, myAccount} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/myAccount", myAccount);

module.exports = router;