// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ vendorId }) => {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append("image", image);

      const res = await axios.post(`/api/vendors/${vendorId}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Product creation failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name (10-20 chars)" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <textarea name="description" placeholder="Description (max 500 chars)" maxLength={500} onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Add Product</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddProduct;
