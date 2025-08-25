// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMyAccount, registerUser } from "../src/redux/authSlice";

export default function RegisterShipper() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({role: "shipper", username: "", password: "", distributionHub: "",});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

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
    const provinces = ["Ha Noi", "Ho Chi Minh", "Đa Nang", "Hai Phong", "Can Tho", "Hue", "Nha Trang",];

    return (
        <div>
            <h2>Register as Shipper</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value.trim()})}/>
                <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
                <select value={form.distributionHub} onChange={e => setForm({...form, distributionHub: e.target.value})}>
                    <option value="">-- Select province/city --</option>
                    {provinces.map((province) => 
                        (<option key={province} value={province}>{province}</option>))}
                </select>
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            </form>

            {/* Show errors if any */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* Displayed successfully */}
            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

            <p>Already have an account? <Link to="/">Login now!</Link></p>
        </div>
    );
}