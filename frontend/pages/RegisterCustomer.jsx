// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterCustomer() {
    const [form, setForm] = useState({role: "customer", username: "", password: "", name: "", address: "",});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");
        try {
           const res = await axios.post("http://localhost:5000/api/auth/register", form);
           setSuccessMsg(res.data.msg); // Display message from backend
        } catch (err) {
        if (err.response && err.response.data) {
            setError(err.response.data.msg); // Show errors from backend 
        } else {
            setError("Network error: " + err.message);
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register as Customer</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value.trim()})}/>
                <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
                <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
                <input placeholder="Address" onChange={e => setForm({...form, address: e.target.value})}/>
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