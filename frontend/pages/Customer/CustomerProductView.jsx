// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/CustomerProductView.css"

const CustomerProductView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // filters
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const params = {};
            if (search) params.search = search;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;

            const res = await axios.get("http://localhost:5000/api/products", {
                params,
                withCredentials: true,
            });
            setProducts(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchProducts();
    }, []); // initial load

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <Container fluid>
            <h2 className="mb-4">🛒 Browse Products</h2>

            {/* 🔎 Sticky Filter form */}
            <div className="filter-bar bg-white shadow-sm p-3 mb-4">
                <Form onSubmit={handleFilterSubmit}>
                    <Row className="g-2">
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Control
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </Col>
                        <Col md={2}>
                            <Button type="submit" variant="primary" className="w-100">
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 🛒 Products grid */}
            <Row>
                {products.map((product) => (
                    <Col xs={12} md={6} lg={4} key={product._id} className="mb-4">
                        <Card
                            className="product-card h-100 d-flex flex-column"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/customerProductDetail/${product._id}`)}
                        >
                            <Card.Img
                                src={`http://localhost:5000/uploads/${product.image || "default.png"}`}
                                alt={product.name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-2">{product.name}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    <strong>${product.price}</strong>
                                    <br />
                                    <span className="description">
                                        {product.description || ""}
                                    </span>
                                </Card.Text>
                                <div className="mt-auto pt-2 border-top">
                                    <strong>Vendor:</strong>{" "}
                                    {product.vendor?.businessName || "Unknown"}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!loading && products.length === 0 && <p>No products found.</p>}
        </Container>
    );
};

export default CustomerProductView;
