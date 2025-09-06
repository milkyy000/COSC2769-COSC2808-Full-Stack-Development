// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Bao Toan
// ID: s4045102

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ListGroup, Image } from "react-bootstrap";

export default function OrderView() {
    const user = useSelector(authSelect.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [show, setShow] = useState(false);

    const handleShow = (order) => {
        setSelectedOrder(order);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const fetchOrders = async () => {
        if (!user?._id) return;
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(
                `http://localhost:5000/api/orders/${user._id}`,
                { withCredentials: true }
            );
            console.log(res.data);
            setOrders(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch orders:", err);
            setError("Failed to load orders. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [user]);

    return (
        <>
            {orders.length === 0 ? (
                <p className="text-center my-3">You have no orders</p>
            ) : (
                <ListGroup>
                    {orders.map((order) => (
                        <ListGroup.Item
                            key={order._id}
                            className="order d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>Order created at:</strong>{" "}
                                {new Date(order.createdAt).toLocaleString()} <br />
                                <strong>Distribution hub:</strong> {order.distributionHub.name} -{" "}
                                {order.distributionHub.address}
                                <br />
                                <strong>Total:</strong>{" "}
                                {order.items.reduce((s, item) => s + item.price * item.quantity, 0)} $<br />
                                <span
                                    className={`
                  d-inline-block px-3 py-1 rounded text-light pb-2 my-1
                  ${order.status === "active" ? "bg-primary" : ""}
                  ${order.status === "delivered" ? "bg-success" : ""}
                  ${order.status === "canceled" ? "bg-danger" : ""}
                `}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <Button variant="primary" size="sm" onClick={() => handleShow(order)}>
                                View Items
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {/* Modal */}
            {selectedOrder && (
                <Modal show={show} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Order from {selectedOrder.distributionHub.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {selectedOrder.items.map((item) => {
                                const product = item.product || {}; // fallback to empty object if null
                                const imageSrc = `http://localhost:5000/uploads/${product.image || "default.png"}`;
                                const productName = product.name || "Unnamed product";
                                const vendorName = product.vendor?.businessName || "Unknown vendor";

                                return (
                                    <ListGroup.Item
                                        key={item._id}
                                        className="d-flex align-items-center gap-3"
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={productName}
                                            thumbnail
                                            rounded
                                        />
                                        <div className="flex-grow-1">
                                            <strong>{productName}</strong> - ${item.price} <br />
                                            <small className="text-muted">
                                                Vendor: {vendorName}
                                            </small>
                                            <p className="fw-light">Quantity: {item.quantity}</p>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );

}