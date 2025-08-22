// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


const ViewMyProducts = () => {
  const vendorId = "68a5876cfa3651ce38610263";
  const [products, setProducts] = useState([]);

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
      alert(err.response?.data?.error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/vendors/${vendorId}/products/${productId}`
      );
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">📦 My Products</h2>
      <Row>
        {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`/images/${product.image || "default.png"}`}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>${product.price}</strong>
                  <br />
                  <small>{product.description}</small>
                </Card.Text>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleUpdateProduct(product._id)}
                >
                  ✏️ Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  🗑 Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewMyProducts;
