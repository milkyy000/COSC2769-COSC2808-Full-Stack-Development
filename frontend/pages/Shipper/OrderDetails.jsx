// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipperOrderById, updateOrderStatus } from "../../src/redux/shipperSlice";
import { Container, Table, Button, Spinner } from "react-bootstrap";

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedOrder, loading, error } = useSelector((s) => s.shipper);
  useEffect(() => {
    document.title = "Order Details | VeloCart";
  }, []);

  useEffect(() => {
    dispatch(fetchShipperOrderById(id));
  }, [dispatch, id]);

  if (loading || !selectedOrder) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const order = selectedOrder;
  const total = order.items.reduce((s, it) => s + it.price * it.quantity, 0);

  const handleUpdate = async (status) => {
    if (!window.confirm(`Set status to "${status}"?`)) return;
    const res = await dispatch(updateOrderStatus({ orderId: id, status }));
    if (!res.error) {
      alert("Status updated");
      navigate("/shipper/orders");
    } else {
      alert("Failed: " + res.error.message || res.payload);
    }
  };

  return (
    <Container>
      <h3>Order Details</h3>
      <p><strong>Customer:</strong> {order.customer?.user?.username} </p>
      <p><strong>Receiver address:</strong> {order.customer?.address || "N/A"}</p>

      <Table bordered>
        <thead>
          <tr>
            <th>Product</th><th>Qty</th><th>Unit price</th><th>Line total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((it) => (
            <tr key={it._id || it.product._id}>
              <td>{it.product?.name || "—"}</td>
              <td>{it.quantity}</td>
              <td>{it.price?.toLocaleString() ?? "0"}</td>
              <td>{(it.price * it.quantity).toLocaleString()}$</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5>Total: {total.toLocaleString()}$</h5>

      <div className="d-flex gap-2">
        <Button variant="success" onClick={() => handleUpdate("delivered")}>Mark as Delivered</Button>
        <Button variant="danger" onClick={() => handleUpdate("canceled")}>Cancel Order</Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
      </div>
    </Container>
  );
}