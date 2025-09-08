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
import "./css/RegisterVendor.css";

export default function RegisterVendor() {

  useEffect(() => {
    document.title = "Vendor Register | VeloCart";
  }, []);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    role: "vendor",
    username: "",
    password: "",
    businessName: "",
    businessAddress: "",
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
          navigate("/view-products");
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
    <div className="register-background">
      <div className="register-card">
        <h2 className="register-title">Register as Vendor</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value.trim() })
            }
          />
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <input
            className="register-input"
            placeholder="Business Name"
            onChange={(e) =>
              setForm({ ...form, businessName: e.target.value })
            }
          />
          <input
            className="register-input"
            placeholder="Business Address"
            onChange={(e) =>
              setForm({ ...form, businessAddress: e.target.value })
            }
          />
          <button type="submit" disabled={loading} className="register-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <p className="register-subtext">
          Already have an account? <Link to="/">Login now!</Link>
        </p>
      </div>
    </div>
  );
}
