// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const DistributionHub = require("../models/DistributionHub")

exports.register = async (req, res) => {
    const session = await User.startSession();
    session.startTransaction();
    try {
        const { role, username, password, profilePicture, name, address, businessName, businessAddress, distributionHub} = req.body;

        // Validate username
        const usernameRegex = /^[A-Za-z0-9]{8,15}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({msg: "Username must be 8–15 characters, letters and digits only"});
        }

        // Validate passwor
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({msg: "Password must be 8–20 chars, include upper, lower, digit, and special !@#$%^&*"});
        }

        // Check duplicate username
        const exist = await User.findOne({username});
        if (exist)
            return res.status(400).json({msg: "Username already exists"});

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user (add transacsion)
        const newUser = new User ({role, username, passwordHash: hashedPassword, profilePicture,})
        await newUser.save({session});

        if (role === "customer") {
            const newCustomer = new Customer({user: newUser._id, name, address});
            await newCustomer.save({session});
        }
        else if (role === "vendor") {
            const newVendor = new Vendor({user: newUser._id, businessName, businessAddress});
            await newVendor.save({session});
        } else if (role === "shipper") {
            const hubDoc = await DistributionHub.findOne({name: distributionHub});
            if (!hubDoc)
                return res.status(400).json({msg: "Distribution hub not found"})
            const newShipper = new Shipper({user: newUser._id, distributionHub: hubDoc._id});
            await newShipper.save({session});
        }
        await session.commitTransaction();
        session.endSession();

        return res.json({msg: "Registration successful", userId: newUser._id});
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Register error:", err);
        return res.status(500).json({msg: "Server error"});
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

        req.session.user = { id: user._id, username: user.username, role: user.role };
        res.json({ msg: "Login successful", user: req.session.user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: err.message });
    }
};

exports.logout = async (req, res) => {
    req.session.destroy();
    res.json({msg: "Logout successful"});
};

exports.myAccount = async (req, res) => {
    if (!req.session.user)
        return res.status(401).json({msg: "Unauthorized"});
    const user = await User.findById(req.session.user.id).select("-passwordHash");
    res.json(user);
};