const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");

exports.getAllProducts = async(req, res) => {
    try {
    const productList = await Product.find();
    console.log(productList);
    res.status(200).json(productList); // send response to client
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};