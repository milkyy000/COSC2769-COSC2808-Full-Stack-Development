import { useDispatch, useSelector } from "react-redux";
import { authSelect, updateProfile } from "../src/redux/authSlice";
import { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

export default function MyAccount() {
  const user = useSelector(authSelect.user);
  const initialized = useSelector(authSelect.initialized);
  const loading = useSelector(authSelect.loading);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  if (loading && !initialized) {
    return <p>Loading...</p>;
  }

  if (!loading && !user && initialized) {
    return <p>You are not logged in.</p>;
  }

  if (!user) {
    return <p>Loading user data...</p>; // fallback, should not happen
  }

  // ✅ Open modal with current user data
  const handleEdit = () => {
    setFormData({
      username: user.username || "",
      businessName: user.businessName || "",
      businessAddress: user.businessAddress || "",
    });
    setProfilePic(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setProfilePic(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Dispatch Redux thunk instead of axios + reload
  const handleSave = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (profilePic) {
      formDataToSend.append("profilePic", profilePic);
    }

    try {
      await dispatch(updateProfile({ id: user._id, formData: formDataToSend }));
      alert("✅ Account updated successfully!");
      setShowModal(false);
    } catch (err) {
      alert("❌ Failed to update account");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-4 overflow-hidden">
            {/* ✅ Cover Banner */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #4e73df, #1cc88a, #36b9cc)",
                height: "150px",
                position: "relative",
              }}
            >
              {/* Profile picture over banner */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "20px",
                }}
              >
                <Image
                  src={`http://localhost:5000/uploads/${
                    user.profilePicture || "default.png"
                  }`}
                  roundedCircle
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "4px solid white",
                  }}
                />
              </div>
            </div>

            <Card.Body className="pt-5">
              <h2 className="text-center mb-4">My Account</h2>

              <Row className="mt-3">
                <Col xs={12}>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  {user.name && (
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                  )}
                  {user.businessName && (
                    <p>
                      <strong>Business Name:</strong> {user.businessName}
                    </p>
                  )}
                  {user.businessAddress && (
                    <p>
                      <strong>Business Address:</strong> {user.businessAddress}
                    </p>
                  )}
                  {user.distributionHub && (
                    <p>
                      <strong>Hub:</strong> {user.distributionHub}
                    </p>
                  )}
                </Col>
              </Row>

              {/* Action button row */}
              <div className="text-center mt-4">
                <Button variant="primary" onClick={handleEdit}>
                  ✏️ Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Edit Account Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit My Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
