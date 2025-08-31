// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488
const express = require("express");
const router = express.Router();
const shipperController = require("../controllers/shipperOrdersController");

// Get all active orders for logged-in shipper's hub
router.get("/orders", shipperController.getActiveOrders);

// Get single order details
router.get("/orders/:id", shipperController.getOrderById);

// Update order status (delivered | canceled)
router.put("/orders/:id/status", shipperController.updateOrderStatus);

module.exports = router;