// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Bao Toan
// ID: s4045102

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");
const ShoppingCart = require("../models/ShoppingCart");
const Order = require("../models/Order");

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const customer = await Customer.findOne({ user: userId })
        if (!customer) {
            res.status(500).json({ error: 'Failed to fetch orders(Couldnt find user).' });
        }
        const orders = await Order.find({ customer: customer._id })
            .populate("customer")
            .populate("distributionHub")
            .populate({
                path:"items.product",
                populate: ({
                    path:"vendor"
                })
            });
        res.json(orders);
    } catch (err) {
        console.error('❌ Failed to load orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
}); 

module.exports = router;