import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/RegisterCustomer.css"; // ✅ Namespaced styles

export default function RegisterCustomer() {
  const [form, setForm] = useState({
    role: "customer",
    username: "",
    password: "",
    name: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
        { withCredentials: true }
      );
      setSuccessMsg(res.data.msg);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.msg);
      } else {
        setError("Network error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-background">
      <div className="customer-card">
        <h2 className="customer-title">Register as Customer</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="customer-input"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value.trim() })
            }
          />
          <input
            className="customer-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            className="customer-input"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="customer-input"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button type="submit" disabled={loading} className="customer-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="customer-error">{error}</p>}
        {successMsg && <p className="customer-success">{successMsg}</p>}

        <p className="customer-subtext">
          Already have an account? <Link to="/">Login now!</Link>
        </p>
      </div>
    </div>
  );
}
