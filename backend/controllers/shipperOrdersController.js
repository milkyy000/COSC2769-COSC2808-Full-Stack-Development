// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488

const Order = require("../models/Order");
const Shipper = require("../models/Shipper");
const DistributionHub = require("../models/DistributionHub");

// Helper: ensure logged in and shipper
function ensureShipper(req, res) {
  if (!req.session?.user) return res.status(401).json({ msg: "Not authenticated" });
  if (req.session.user.role !== "shipper") return res.status(403).json({ msg: "Forbidden - not a shipper" });
  return null;
}


exports.getActiveOrders = async (req, res) => {
  try {
    const err = ensureShipper(req, res);
    if (err) return;

   
    const shipper = await Shipper.findOne({ user: req.session.user.id });
    if (!shipper) return res.status(404).json({ msg: "Shipper profile not found" });

    
    const orders = await Order.find({
      distributionHub: shipper.distributionHub,
      status: "active",
    })
      .populate({
        path: "customer",
        populate: { path: "user", select: "username profilePicture" },
      })
      .populate({
        path: "items.product",
        populate: { path: "vendor", populate: { path: "user", select: "username" } },
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("getActiveOrders error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const err = ensureShipper(req, res);
    if (err) return;

    const shipper = await Shipper.findOne({ user: req.session.user.id });
    if (!shipper) return res.status(404).json({ msg: "Shipper profile not found" });

    const order = await Order.findById(req.params.id)
      .populate({
        path: "customer",
        populate: { path: "user", select: "username profilePicture" },
      })
      .populate("items.product");

    if (!order) return res.status(404).json({ msg: "Order not found" });

    
    if (order.distributionHub.toString() !== shipper.distributionHub.toString()) {
      return res.status(403).json({ msg: "Forbidden - order not assigned to your hub" });
    }

    res.json(order);
  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const err = ensureShipper(req, res);
    if (err) return;

    const shipper = await Shipper.findOne({ user: req.session.user.id });
    if (!shipper) return res.status(404).json({ msg: "Shipper profile not found" });

    const { status } = req.body;
    if (!["delivered", "canceled"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (order.distributionHub.toString() !== shipper.distributionHub.toString()) {
      return res.status(403).json({ msg: "Forbidden - order not assigned to your hub" });
    }

    if (order.status !== "active") {
      return res.status(400).json({ msg: "Only active orders can be updated" });
    }

    order.status = status;
    await order.save();

    // return updated order (populated)
    const populated = await Order.findById(order._id)
      .populate({ path: "customer", populate: { path: "user", select: "username profilePicture" } })
      .populate("items.product");

    res.json(populated);
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};