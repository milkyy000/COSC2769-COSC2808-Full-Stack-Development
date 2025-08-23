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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] }); // store File object
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user?._id) {
      setError("⚠️ Please log in as a vendor before adding products.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);
      if (form.image) data.append("image", form.image);

      await axios.post(
        `http://localhost:5000/api/vendors/${user._id}/products`,
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
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
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

        <Button type="submit" variant="primary" disabled={!user}>
          Add Product
        </Button>
      </Form>
    </Container>

  );
};

export default AddProduct;
