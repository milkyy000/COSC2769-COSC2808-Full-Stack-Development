// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import VendorRegister from "./pages/Auth/VendorRegister";
import CustomerRegister from "./pages/Auth/CustomerRegister";
import ShipperRegister from "./pages/Auth/ShipperRegister";
import Login from "./pages/Auth/Login";

// Vendor Pages
import VendorProduct from "./pages/Vendor/VendorProduct";   
import AddProduct from "./pages/Vendor/AddProduct";

// Customer Pages
import CustomerProducts from "./pages/Customer/CustomerProducts";
import ShoppingCart from "./pages/Customer/ShoppingCart";

// Shipper Pages
import ShipperOrders from "./pages/Shipper/ShipperOrders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route path="/register/customer" element={<CustomerRegister />} />
        <Route path="/register/shipper" element={<ShipperRegister />} />

        {/* Vendor routes */}
        <Route path="/vendor/product" element={<VendorProduct />} />
        <Route path="/vendor/add-product" element={<AddProduct />} />

        {/* Customer routes */}
        <Route path="/customer/products" element={<CustomerProducts />} />
        <Route path="/customer/cart" element={<ShoppingCart />} />

        {/* Shipper routes */}
        <Route path="/shipper/orders" element={<ShipperOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
