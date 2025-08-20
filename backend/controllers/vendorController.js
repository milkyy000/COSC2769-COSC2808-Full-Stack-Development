// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Vendor = require("../models/Vendor");

exports.createVendor = async (req, res) => {
    try {
        const {userId, businessName, businessAddress} = req.body;
        if (!businessName  || businessName .length < 5)
            return res.status(400).json({msg: "Business name required, min 5 chars"});
        if (!businessAddress  || businessAddress .length < 5)
            return res.status(400).json({msg: "Business address required, min 5 chars"});
        const newVendor = new Vendor({user: userId, businessName, businessAddress});
        await newVendor.save();
        res.json({msg: "Vendor created successfully"});
    } catch (err) {
        console.error("Vendor create error:", err);
        res.status(500).json({msg: "Server error"});
    }
};

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("user", "-passwordHash");
        res.json(vendors);
    } catch (err) {
        console.error("Get vendors error:", err);
        res.status(500).json({msg: "Server error"});
    }
};