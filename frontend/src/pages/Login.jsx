// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({username: "", password: ""});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form, {withCredentials: true});
            if (res.data?.user?.id) {
                setUser(res.data.user);
            } else {
                setError("Login Failed");
                setUser(null);
            }
        } catch (err) {
            setError(err.response?.data?.msg || "Network error");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // return (
    //     <div>
    //         <form onSubmit={handleSubmit}>
    //             <input placeholder="Username" required onChange={e => setForm({...form, username: e.target.value})}/>
    //             <input placeholder="Password" type="password" required onChange={e => setForm({...form, password: e.target.value})}/>
    //             <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    //         </form>

    //         {/* Show errors if any */}
    //         {error && <p style={{ color: "red" }}>{error}</p>}
    //         {/* Displayed successfully */}
    //         {user && <p style={{color: "green"}}>Login successful! Welcome, {user.username}</p>}

    //         <p>Don't have an account? <Link to="/registerCustomer">Register as Customer now!</Link></p>
    //         <p>Don't have an account? <Link to="/registerVendor">Register as Vendor now!</Link></p>
    //         <p>Don't have an account? <Link to="/registerShipper">Register as Shipper now!</Link></p>
    //     </div>
        
        
    // );

    return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Show errors if any */}
            {error && <p className="text-danger mt-3">{error}</p>}

            {/* Displayed successfully */}
            {user && (
              <p className="text-success mt-3">
                Login successful! Welcome, {user.username}
              </p>
            )}

            <hr />
            <p className="text-center mb-1">
              Don't have an account?{" "}
              <Link to="/registerCustomer">Register as Customer</Link>
            </p>
            <p className="text-center mb-1">
              Or{" "}
              <Link to="/registerVendor">Register as Vendor</Link>
            </p>
            <p className="text-center">
              Or{" "}
              <Link to="/registerShipper">Register as Shipper</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}