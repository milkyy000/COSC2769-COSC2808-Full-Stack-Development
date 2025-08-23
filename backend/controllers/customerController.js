// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("user", "-passwordHash");
        res.json(customers);
    } catch (err) {
        console.error("Get customers error:", err);
        res.status(500).json({msg: "Server error"});
    }
};