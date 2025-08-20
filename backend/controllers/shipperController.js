// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const Shipper = require("../models/Shipper");
const DistributionHub = require("../models/DistributionHub");

exports.createShipper = async (req, res) => {
    try {
        const {userId, distributionHub} = req.body;
        if (!distributionHub)
            return res.status(400).json({msg: "Shipper must select a distribution hub"});
        const hubDoc = await DistributionHub.findOne({name: distributionHub});
        if (!hubDoc)
            return res.status(400).json({msg: "Distribution hub not found"})
        const newShipper = new Shipper({user: userId, distributionHub: hubDoc._id});
        await newShipper.save();
    } catch (err) {
        console.error("Shipper create error:", err);
        res.status(500).json({msg: "Server error"});
    }
};

exports.getShippers = async (req, res) => {
    try {
        const shippers = await Shipper.find().populate("user", "-passwordHash").populate("distributionHub");
        res.json(shippers);
    } catch (err) {
        console.error("Get shippers error:", err);
        res.status(500).json({msg: "Server error"});
    }
};