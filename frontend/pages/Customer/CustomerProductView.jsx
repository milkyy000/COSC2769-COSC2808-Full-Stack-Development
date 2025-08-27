// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const CustomerProductView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        <Container>
            <h2 className="mb-4">🛒 Browse Products</h2>

            {/* Filter form */}
            <Form onSubmit={handleFilterSubmit} className="mb-4">
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

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Products grid */}
            <Row>
                {products.map((product) => (
                    <Col xs={12} md={6} lg={4} key={product._id} className="mb-4">
                        <Card className="product-card h-100">
                            <Card.Img
                                src={`http://localhost:5000/uploads/${product.image || "default.png"}`}
                                alt={product.name}
                            />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <strong>${product.price}</strong>
                                    <br />
                                    <small>{product.description}</small>
                                    <hr />
                                    <strong>Vendor:</strong> {product.vendor?.businessName || "Unknown"}
                                    <br />
                                    <strong>Address:</strong> <small>{product.vendor?.businessAddress}</small>
                                </Card.Text>
                                <Button variant="success" size="sm">
                                    ➕ Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!loading && products.length === 0 && (
                <p>No products found. Try adjusting filters.</p>
            )}
        </Container>
    );
};

export default CustomerProductView;
