// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Shipper = require("../models/Shipper");

exports.getShippers = async (req, res) => {
    try {
        const shippers = await Shipper.find().populate("user", "-passwordHash").populate("distributionHub");
        res.json(shippers);
    } catch (err) {
        console.error("Get shippers error:", err);
        res.status(500).json({msg: "Server error"});
    }
};