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
import "./css/RegisterShipper.css"; // ✅ import namespaced CSS

export default function RegisterShipper() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        role: "shipper",
        username: "",
        password: "",
        distributionHub: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const provinces = ["Ha Noi", "Ho Chi Minh", "Đa Nang", "Hai Phong", "Can Tho", "Hue", "Nha Trang"];

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
                setTimeout(() => navigate("/shipper/orders"), 1000);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        await dispatch(fetchMyAccount()).unwrap();
    };

    return (
        <div className="shipper-background">
            <div className="shipper-card">
                <h2 className="shipper-title">Register as Shipper</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="shipper-input"
                        placeholder="Username"
                        onChange={(e) => setForm({ ...form, username: e.target.value.trim() })}
                    />
                    <input
                        className="shipper-input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <select
                        className="shipper-select"
                        value={form.distributionHub}
                        onChange={(e) => setForm({ ...form, distributionHub: e.target.value })}
                    >
                        <option value="">-- Select province/city --</option>
                        {provinces.map((province) => (
                            <option key={province} value={province}>{province}</option>
                        ))}
                    </select>
                    <button className="shipper-btn" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {error && <p className="shipper-error">{error}</p>}
                {successMsg && <p className="shipper-success">{successMsg}</p>}

                <p className="shipper-subtext">
                    Already have an account? <Link to="/">Login now!</Link>
                </p>
            </div>
        </div>
    );
}
