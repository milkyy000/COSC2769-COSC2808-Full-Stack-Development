const express = require("express");
const router = express.Router();
const { getAllProducts } = require('../controllers/productController')

const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");


router.get("/getAllProducts", getAllProducts);

// ✅ GET all products (for customers, with filtering & searching)
router.get("/", async (req, res) => {
    try {
        const { minPrice, maxPrice, search } = req.query;
        let filter = {};

        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
        if (search) filter.name = { $regex: search, $options: "i" };

        const products = await Product.find(filter)
            .populate({
                path: "vendor",
                populate: { path: "user", select: "username profilePicture" }
            });

        res.json(products);
    } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// ✅ GET one product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: "vendor",
                populate: { path: "user", select: "username profilePicture" }
            });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error("❌ Failed to fetch product:", err);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});


module.exports = router;