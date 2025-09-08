// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMyAccount, registerUser } from "../src/redux/authSlice";
import { useContext } from "react";
import { ThemeContext } from "../src/ThemeContext";
import "./css/RegisterCustomer.css";

export default function RegisterCustomer() {

  useEffect(() => {
    document.title = "Customer Register | VeloCart";
  }, []);

  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  const { setLight } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await dispatch(registerUser(form)).unwrap();
      setSuccessMsg(res.msg);

      if (res.msg === "Registration successful") {

        setTimeout(() => {
          setLight();
          navigate("/customerProductView");
        }, 1000);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    await dispatch(fetchMyAccount()).unwrap();
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
