// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Vendor = require("../models/Vendor");

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate("user", "-passwordHash");
        res.json(vendors);
    } catch (err) {
        console.error("Get vendors error:", err);
        res.status(500).json({msg: "Server error"});
    }
};