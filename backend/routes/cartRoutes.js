const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");
const ShoppingCart = require("../models/ShoppingCart");

router.get(':/customerId/shoppingCart', async(req, res) => {
    try{
    const shoppingCart = await ShoppingCart.findOne({customer: req.params.customerId});
    res.json(shoppingCart);
  } catch (err) {
    console.error('❌ Failed to fetch shopping cart:', err);
    res.status(500).json({ error: 'Failed to fetch shopping cart(cartRoutes.js)' });
  } 
});

module.exports = router;