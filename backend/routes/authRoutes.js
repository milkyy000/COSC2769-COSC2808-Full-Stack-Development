// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const express = require("express");
const router = express.Router();
const {register, login, logout, myAccount} = require("../controllers/authController");
const {createCustomer, getCustomers} = require("../controllers/customerController");
const {createVendor, getVendors} = require("../controllers/vendorController");
const {createShipper, getShippers} = require("../controllers/shipperController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/myAccount", myAccount);
// Customer
router.get("/register", getCustomers);
router.post("/register", createCustomer);
// Vendor
router.get("/register", getVendors);
router.post("/register", createVendor);
// Shipper
router.get("/register", getShippers);
router.post("/register", createShipper);

module.exports = router;