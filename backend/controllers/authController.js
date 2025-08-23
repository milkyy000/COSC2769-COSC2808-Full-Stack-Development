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

// Register
exports.register = async (req, res) => {
    const session = await User.startSession();
    session.startTransaction();
    try {
        const { role, username, password, profilePicture, name, address, businessName, businessAddress, distributionHub} = req.body;

        // Validate username
        const usernameRegex = /^[A-Za-z0-9]{8,15}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({msg: "Username must be 8-15 characters, letters and digits only"});
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({msg: "Password must be 8-20 chars, include upper, lower, digit, and special !@#$%^&*"});
        }
        // validate role-specific fields
        async function handleValidateError(session, res, msg) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({msg});
        }

        if (role === "customer") {
            if (!name || name.length < 5) {
                return handleValidateError(session, res, "Customer name required, min 5 chars");
            }
            if (!address || address.length < 5) {
                return handleValidateError(session, res, "Customer address required, min 5 chars");
            }
        }
        else if (role === "vendor") {
            if (!businessName || businessName.length < 5) {
                return handleValidateError(session, res, "Business name required, min 5 chars");
            }
            if (!businessAddress || businessAddress.length < 5) {
                return handleValidateError(session, res, "Business address required, min 5 chars");
            }
        }
        else if (role === "shipper") {
            if (!distributionHub) {
                return handleValidateError(session, res, "Shipper must select a distribution hub");
            }
        }
        
        // Check duplicate username
        const exist = await User.findOne({username});
        if (exist)
            return res.status(400).json({msg: "Username already exists"});

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User ({role, username, passwordHash: hashedPassword, profilePicture,})
        await newUser.save({session});

        if (role === "customer") {
            const newCustomer = new Customer({user: newUser._id, name, address});
            await newCustomer.save({session});
        }
        else if (role === "vendor") {
            const newVendor = new Vendor({user: newUser._id, businessName, businessAddress});
            await newVendor.save({session});
        } 
        else if (role === "shipper") {
            const hubDoc = await DistributionHub.findOne({name: distributionHub});
            if (!hubDoc) {
                return handleValidateError(session, res, "Distribution hub not found");
            }
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

// Login
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

// Logout
exports.logout = async (req, res) => {
    req.session.destroy();
    res.json({msg: "Logout successful"});
};

// My account
exports.myAccount = async (req, res) => {
    if (!req.session.user)
        return res.status(401).json({msg: "Unauthorized"});
    const user = await User.findById(req.session.user.id).select("-passwordHash");
    let extra = {};
    if (user.role === "customer") {
        const customer = await Customer.findOne({user: user._id});
        if (customer) extra = {name: customer.name, address: customer.address};
    }
    else if (user.role === "vendor") {
        const vendor = await Vendor.findOne({user: user._id});
        if (vendor) extra = {businessName: vendor.businessName, businessAddress: vendor.businessAddress};
    }
    else if (user.role === "shipper") {
        const shipper = await Shipper.findOne({user: user._id}).populate("distributionHub");
        if (shipper) extra = {distributionHub: shipper.distributionHub.name};
    }
    console.log("MyAccount response:", {...user.toObject(), ...extra});
    res.json({...user.toObject(), ...extra});
};