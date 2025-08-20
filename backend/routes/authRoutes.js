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
router.get("/customers", getCustomers);
router.post("/customers", createCustomer);
// Vendor
router.get("/vendors", getVendors);
router.post("/vendors", createVendor);
// Shipper
router.get("/shippers", getShippers);
router.post("/shippers", createShipper);

module.exports = router;