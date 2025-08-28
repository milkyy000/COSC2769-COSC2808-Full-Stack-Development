// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
        <Container>
            <Row className="mt-4">
                <Col md={6}>
                    <Card.Img
                        src={`http://localhost:5000/uploads/${product.image || "default.png"}`}
                        alt={product.name}
                        style={{ width: "100%", height: "auto" }}
                    />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <h4>${product.price}</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p>
                        <strong>Vendor:</strong>{" "}
                        {product.vendor?.businessName || "Unknown"} <br />
                        <strong>Address:</strong>{" "}
                        {product.vendor?.businessAddress || "N/A"}
                    </p>
                    <Button variant="success" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    <br />
                    <Link to="/products">
                        <Button variant="secondary" className="mt-3">
                            Back to Products
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerProductDetail;
