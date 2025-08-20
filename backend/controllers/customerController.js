// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Customer = require("../models/Customer");

exports.createCustomer = async (req, res) => {
    try {
        const {userId, name, address} = req.body;
        if (!name || name.length < 5)
            return res.status(400).json({msg: "Customer name required, min 5 chars"});
        if (!address || address.length < 5)
            return res.status(400).json({msg: "Customer address required, min 5 chars"});
        const newCustomer = new Customer({user: userId, name, address});
        await newCustomer.save();
        res.json({msg: "Customer created successfully"});
    } catch (err) {
        console.error("Customer create error:", err);
        res.status(500).json({msg: "Server error"});
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("user", "-passwordHash");
        res.json(customers);
    } catch (err) {
        console.error("Get customers error:", err);
        res.status(500).json({msg: "Server error"});
    }
};