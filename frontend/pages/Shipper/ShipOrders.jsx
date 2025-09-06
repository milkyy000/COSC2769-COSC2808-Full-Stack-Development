// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipperOrders } from "../../src/redux/shipperSlice";
import { authSelect } from "../../src/redux/authSlice";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ShipOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.shipper);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    document.title = "Orders | VeloCart";
  }, []);

  useEffect(() => {
    dispatch(fetchShipperOrders());
  }, [dispatch]);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  return (
    <Container>
      <h2>Assigned Active Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {orders.length === 0 && <div>No active orders assigned to your hub.</div>}
      <Row className="g-3">
        {orders.map((order) => {
          const total = order.items.reduce((s, it) => s + it.price * it.quantity, 0);
          return (
            <Col key={order._id} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Order #{order._id.slice(-6)}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    Customer: {order.customer?.user?.username || "Unknown"}
                  </Card.Subtitle>
                  <Card.Text>
                    Items: {order.items.length} <br />
                    Total: {total.toLocaleString()} <br />
                    Ordered: {new Date(order.createdAt).toLocaleString()}
                  </Card.Text>
                  <Link to={`/shipper/orders/${order._id}`}>
                    <Button variant="primary">View details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}