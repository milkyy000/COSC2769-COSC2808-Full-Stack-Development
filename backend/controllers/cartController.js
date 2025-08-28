const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");
const ShoppingCart = require("../models/ShoppingCart");

exports.getCustomerCart = async(req, res) => {
    try{
        console.log(req.body)
        const cart = await ShoppingCart.find()
        res.json(cart);
    } catch (err) {
        console.error("Get shopping cart error:", err);
        res.status(500).json({msg: "Server error(cartController)"});
    }
}

