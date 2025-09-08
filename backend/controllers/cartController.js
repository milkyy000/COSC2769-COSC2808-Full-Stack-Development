// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Bao Toan
// ID: s4045102

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

