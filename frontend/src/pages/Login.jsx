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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})}/>
                <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>

            {/* Show errors if any */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* Displayed successfully */}
            {user && <p style={{color: "green"}}>Login successful! Welcome, {user.username}</p>}

            <p>Don't have an account? <Link to="/register">Register now!</Link></p>
        </div>
        
    );
}