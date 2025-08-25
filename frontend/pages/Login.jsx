// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, fetchMyAccount } from "../src/redux/authSlice";
import "./css/Login.css"

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await dispatch(loginUser(form)).unwrap();
      if (res.user?.id) {
        const loggedInUser = res.user;
        setUser(loggedInUser);

        switch (loggedInUser.role) {
          case "customer":
            navigate("/registerCustomer");
            break;
          case "vendor":
            navigate("/view-products");
            break;
          case "shipper":
            navigate("/registerShipper");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Login failed");
        setUser(null);
      }
    } catch (err) {
      setError(err || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }

    await dispatch(fetchMyAccount()).unwrap();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-background">
      <div className="card p-4 shadow-lg login-card">
        <h2 className="text-center mb-4 fw-bold login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label login-label">Username</label>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Enter username"
              required
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label login-label">Password</label>
            <input
              type="password"
              className="form-control login-input"
              placeholder="Enter password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="btn w-100 login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 py-2" role="alert">
            {error}
          </div>
        )}
        {user && (
          <div className="alert alert-success mt-3 py-2" role="alert">
            Login successful! Welcome, {user.username}
          </div>
        )}

        <hr className="login-divider" />

        <p className="text-center login-subtext">Don’t have an account?</p>
        <div className="d-flex flex-column gap-2">
          <Link to="/registerCustomer" className="btn login-register-btn">
            Register as Customer
          </Link>
          <Link to="/registerVendor" className="btn login-register-btn">
            Register as Vendor
          </Link>
          <Link to="/registerShipper" className="btn login-register-btn">
            Register as Shipper
          </Link>
        </div>
      </div>
    </div>
  );
}
