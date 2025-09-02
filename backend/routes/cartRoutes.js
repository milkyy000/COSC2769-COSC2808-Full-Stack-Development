const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Shipper = require("../models/Shipper");
const Product = require('../models/Product')
const DistributionHub = require("../models/DistributionHub");
const ShoppingCart = require("../models/ShoppingCart");
const Order = require("../models/Order");

// router.get(':/customerId/shoppingCart', async(req, res) => {
//     try{
//     const shoppingCart = await ShoppingCart.findOne({customer: req.params.customerId});
//     res.json(shoppingCart);
//   } catch (err) {
//     console.error('❌ Failed to fetch shopping cart:', err);
//     res.status(500).json({ error: 'Failed to fetch shopping cart(cartRoutes.js)' });
//   } 
// });
router.post('/add/:userId/:productId', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, productId } = req.params;

    // Find customer by userId
    const customer = await Customer.findOne({ user: userId });
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Find product
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if product already exists in cart
    let cart = await ShoppingCart.findOne({ customer: customer._id }).session(session);

    if (cart) {
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        // ✅ Increment quantity if product already exists
        existingItem.quantity += 1;
      } else {
        // ✅ Add new product if not in cart
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save({ session });
    } else {
      // ✅ If no cart exists, create one
      cart = new ShoppingCart({
        customer: customer._id,
        items: [{ product: productId, quantity: 1 }]
      });
      await cart.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, cart });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('❌ Failed to add to shopping cart:', err);
    res.status(500).json({ error: 'Failed to add to shopping cart: Item already in cart' });
  }
});

router.get('/:userId/shoppingCart', async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.findOne({ user: userId });
    const cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error('❌ Failed to load shopping cart:', err);
    res.status(500).json({ error: 'Failed to load shopping cart' });
  }
})

// PUT /cart/:productId
router.put("/:userId/shoppingCart", async (req, res) => {
  try {
    const { userId } = req.params;
    const customer = await Customer.findOne({ user: userId });
    const { productId, quantity } = req.body;

    let cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item in cart
    const itemIndex = cart.items.findIndex((i) => i.product._id.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    //Repopulate
    cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /:userId/shoppingCart/:productId
router.delete("/:userId/shoppingCart/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find customer
    const customer = await Customer.findOne({ user: userId });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    // Find cart
    let cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove product
    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );

    await cart.save();

    // Re-populate to get updated product info
    cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error("❌ Error deleting cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:userId/createOrder", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.params;
    // Find customer
    const customer = await Customer.findOne({ user: userId });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    // Find cart
    let cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price, // take the price from product
    }));

    //Find hub
    const hub = await DistributionHub.aggregate([{ $sample: { size: 1 } }]);
    if (!hub || hub.length === 0) {
      return res.status(404).json({ message: "No distribution hubs available" });
    }

    // Create order
    const order = new Order({
      customer: customer._id,
      distributionHub: hub[0]._id,
      status: "active",
      createdAt: Date.now(),
      items: orderItems,
    });

    await order.save({ session });

    // Clear cart
    cart.items = [];
    await cart.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Re-populate to get updated product info
    cart = await ShoppingCart.findOne({ customer: customer._id }).populate("items.product");
    res.json(cart);

  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;