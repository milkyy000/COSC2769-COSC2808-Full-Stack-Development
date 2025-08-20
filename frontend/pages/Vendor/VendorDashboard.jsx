// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorDashboard = () => {
  const vendorId = "68a5876cfa3651ce38610263";

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [error, setError] = useState(""); // ✅ error state

  // ✅ Fetch vendor products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vendors/${vendorId}/products`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  // ✅ Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(""); // clear old error
    try {
      await axios.post(
        `http://localhost:5000/api/vendors/${vendorId}/products`,
        {
          ...form,
          price: Number(form.price) // cast to number
        }
      );
      setForm({ name: "", price: "", description: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed to add product:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to add product");
    }
  };

  // ✅ Update product (simple inline edit — updates only the name for demo)
  const handleUpdateProduct = async (productId) => {
    const newName = prompt("Enter new name (10-20 chars):");
    if (!newName) return;

    try {
      await axios.put(
        `http://localhost:5000/api/vendors/${vendorId}/products/${productId}`,
        { ...products.find((p) => p._id === productId), name: newName }
      );
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed to update product:", err.response?.data || err);
      alert(err.response?.data?.error);
    }
  };

  // ✅ Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/vendors/${vendorId}/products/${productId}`
      );
      fetchProducts();
    } catch (err) {
      console.error("❌ Failed to delete product:", err.response?.data || err);
      alert(err.response?.data?.error || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Vendor Dashboard</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name (10–20 chars)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          required
        />
        <input
          type="text"
          placeholder="Image Filename"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          placeholder="Description (max 500 chars)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">➕ Add Product</button>
      </form>

      {/* ✅ Show validation error */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>❌ {error}</p>
      )}

      {/* Product List */}
      <h3>My Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: "10px" }}>
            <strong>{product.name}</strong> — ${product.price}
            <br />
            <em>{product.description}</em>
            <br />
            <button onClick={() => handleUpdateProduct(product._id)}>
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              style={{ marginLeft: "10px" }}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorDashboard;
