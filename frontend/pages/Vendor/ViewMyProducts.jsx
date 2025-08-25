import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";

const ViewMyProducts = () => {
  const user = useSelector(authSelect.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const fetchProducts = async () => {
    if (!user?._id) return;
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

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: null,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({ name: "", price: "", description: "", image: null });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await axios.put(
        `http://localhost:5000/api/vendors/${user._id}/products/${selectedProduct._id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      fetchProducts();
      handleCloseModal();
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
  }, [user]);

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
                src={`http://localhost:5000/uploads/${product.image || "/uploads/default.png"}`}
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
                  onClick={() => handleOpenModal(product)}
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
      {!loading && products.length === 0 && <p>No products found. Try adding some!</p>}

      {/* Update Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name (10–20 chars)</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleFormChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewMyProducts;
