// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

const Product = require('../models/Product')

exports.getAllProducts = async (req, res) => {
    try {
        const productList = await Product.find()
            .populate("vendor", "businessName businessAddress");
        console.log("productController: " + productList);
        res.status(200).json(productList); // send response to client
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products" });
    }
};