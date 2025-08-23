// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, fetchMyAccount } from "../src/redux/authSlice"; // ✅ fetchMyAccount added

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
      // 🔹 First do login
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

      // 🔹 Immediately fetch full account details after login
      await dispatch(fetchMyAccount()).unwrap();

      // ✅ Redirect based on role
      
    
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       placeholder="Username"
    //       required
    //       onChange={(e) => setForm({ ...form, username: e.target.value })}
    //     />
    //     <input
    //       placeholder="Password"
    //       type="password"
    //       required
    //       onChange={(e) => setForm({ ...form, password: e.target.value })}
    //     />
    //     <button type="submit" disabled={loading}>
    //       {loading ? "Logging in..." : "Login"}
    //     </button>
    //   </form>

    //   {/* Show errors if any */}
    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   <p>
    //     Don't have an account?{" "}
    //     <Link to="/registerCustomer">Register as Customer now!</Link>
    //   </p>
    //   <p>
    //     Don't have an account?{" "}
    //     <Link to="/registerVendor">Register as Vendor now!</Link>
    //   </p>
    //   <p>
    //     Don't have an account?{" "}
    //     <Link to="/registerShipper">Register as Shipper now!</Link>
    //   </p>
    // </div>

    <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" required onChange={e => setForm({...form, username: e.target.value})}/>
                <input placeholder="Password" type="password" required onChange={e => setForm({...form, password: e.target.value})}/>
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>

            {/* Show errors if any */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* Displayed successfully */}
            {user && <p style={{color: "green"}}>Login successful! Welcome, {user.username}</p>}

            <p>Don't have an account? <Link to="/registerCustomer">Register as Customer now!</Link></p>
            <p>Don't have an account? <Link to="/registerVendor">Register as Vendor now!</Link></p>
            <p>Don't have an account? <Link to="/registerShipper">Register as Shipper now!</Link></p>
        </div>
  );
        </div>
  );
}

