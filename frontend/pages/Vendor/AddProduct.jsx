// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice"; // ⚠️ adjust path if needed
import "../css/AddProduct.css"

const AddProduct = () => {
  const user = useSelector(authSelect.user);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null, // will be File
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?._id) {
      setError("⚠️ Please log in as a vendor before adding products.");
      return;
    }

    if (!form.image) {
      setError("⚠️ Product image is required.");
      return;
    }

    if (form.price <= 0) {
      setError("⚠️ Product price must be positive number")
    }

    if (form.description.length > 500) {
      setError("⚠️ Description must be 500 characters or less.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("image", form.image);

      await axios.post(
        `http://localhost:5000/api/vendors/${user.vendorId}/products`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setForm({ name: "", price: "", description: "", image: null });
      setSuccess("✅ Product added successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add product");
    }
  };



  return (
    <Container className="add-product-background">
      <div className="add-product-card">
        <h2 className="add-product-title">➕ Add New Product</h2>

        {error && <div className="add-product-error">{error}</div>}
        {success && <div className="add-product-success">{success}</div>}

        <Form onSubmit={handleAddProduct}>
          <Form.Group className="mb-3">
            <Form.Label className="add-product-file-label">Product Name</Form.Label>
            <Form.Control
              className="add-product-input"
              type="text"
              placeholder="Enter name (10–20 chars)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="add-product-file-label">Price</Form.Label>
            <Form.Control
              className="add-product-input"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="add-product-file-label">Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="add-product-file-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Max 500 chars"
              className="add-product-textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={500}
            />
          </Form.Group>

          <Button type="submit" className="add-product-btn" disabled={!user}>
            Add Product
          </Button>
        </Form>
      </div>
    </Container>


  );
};

export default AddProduct;
