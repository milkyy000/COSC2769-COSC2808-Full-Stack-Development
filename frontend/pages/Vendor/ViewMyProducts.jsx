// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice"; // ⚠️ adjust path if needed

const ViewMyProducts = () => {
  const user = useSelector(authSelect.user); // ✅ get logged-in user from Redux
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    if (!user?._id) return; // wait until user is loaded
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vendors/${user._id}/products`,
        { withCredentials: true }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (productId) => {
    const newName = prompt("Enter new name (10-20 chars):");
    if (!newName) return;
    try {
      await axios.put(
        `http://localhost:5000/api/vendors/${user._id}/products/${productId}`,
        { ...products.find((p) => p._id === productId), name: newName },
        { withCredentials: true }
      );
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/vendors/${user._id}/products/${productId}`,
        { withCredentials: true }
      );
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]); // ✅ re-run when user is available

  if (!user) {
    return <p style={{ color: "red" }}>⚠️ Please log in as a vendor to view your products.</p>;
  }

  return (
    <Container>
      <h2 className="mb-4">📦 My Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Row>
        {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top border"
                src={`http://localhost:5000${product.image || "/uploads/default.png"}`}
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
      {!loading && products.length === 0 && (
        <p>No products found. Try adding some!</p>
      )}
    </Container>
  );
};

export default ViewMyProducts;
