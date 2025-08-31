// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "../css/CustomerProductDetail.css"

const CustomerProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
                withCredentials: true,
            });
            setProduct(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch product:", err);
            setError("Failed to load product.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/cart`,
                { productId: product._id },
                { withCredentials: true }
            );
            alert("✅ Product added to cart!");
        } catch (err) {
            console.error("❌ Failed to add to cart:", err);
            alert("Failed to add to cart.");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!product) return null;

    return (
        <Container className="my-4">
            {/* Back button at top left */}
            <div className="mb-3">
                <Link to="/customerProductView">
                    <Button variant="outline-secondary" size="sm">
                        ← Back to Products
                    </Button>
                </Link>
            </div>

            <Row className="g-4">
                {/* Product Image */}
                <Col md={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Img
                            src={`http://localhost:5000/uploads/${product.image || "default.png"}`}
                            alt={product.name}
                            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                        />
                    </Card>
                </Col>

                {/* Product Info */}
                <Col md={6} className="d-flex flex-column justify-content-between">
                    <div>
                        <h2 className="fw-bold">{product.name}</h2>
                        <h4 className="text-success mb-3">
                            ${product.price}
                        </h4>
                        <p className="product-description flex-grow-1">{product.description}</p>
                        <hr />
                        <p>
                            <strong>Vendor:</strong>{" "}
                            <Badge bg="info" className="ms-1">
                                {product.vendor?.businessName || "Unknown"}
                            </Badge>
                            <br />
                            <strong>Address:</strong>{" "}
                            {product.vendor?.businessAddress || "N/A"}
                        </p>
                    </div>

                    <div>
                        <Button variant="success" size="lg" className="w-100" onClick={handleAddToCart}>
                            🛒 Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerProductDetail;
