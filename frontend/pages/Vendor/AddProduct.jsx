// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const AddProduct = () => {
  const vendorId = "68a5876cfa3651ce38610263";
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `http://localhost:5000/api/vendors/${vendorId}/products`,
        { ...form, price: Number(form.price) }
      );
      setForm({ name: "", price: "", description: "", image: "" });
      setSuccess("✅ Product added successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add product");
    }
  };

  return (
    <Container>
      <h2>➕ Add New Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleAddProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name (10–20 chars)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image Filename</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., product.jpg"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Max 500 chars"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
