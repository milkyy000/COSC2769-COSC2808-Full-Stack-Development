const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const upload = require("../config/multer");

// ✅ Update profile (user + vendor if role=vendor)
router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const { id } = req.params;

    // --- Find user ---
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // --- Update user fields ---
    if (req.body.username) user.username = req.body.username;
    if (req.file) user.profilePicture = req.file.filename;

    await user.save();

    // --- Vendor update ---
    if (user.role === "vendor") {
      let vendor = await Vendor.findOne({ user: user._id });
      if (!vendor) {
        return res.status(404).json({ error: "Vendor profile not found" });
      }

      if (req.body.businessName) vendor.businessName = req.body.businessName;
      if (req.body.businessAddress) vendor.businessAddress = req.body.businessAddress;

      await vendor.save();
    }

    // --- 🔄 Re-fetch user with vendor info ---
    let responseUser = user.toObject();
    if (user.role === "vendor") {
      const vendor = await Vendor.findOne({ user: user._id }).lean();
      if (vendor) {
        responseUser.businessName = vendor.businessName;
        responseUser.businessAddress = vendor.businessAddress;
      }
    }

    // --- Send same shape as login ---
    res.json({
      message: "✅ Profile updated successfully",
      user: responseUser,
    });

  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
