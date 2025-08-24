// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMyAccount, registerUser } from "../src/redux/authSlice";
// import { registerUser } from "../src/redux/authSlice";
// import { authSelect } from "../redux/authSlice";

export default function RegisterVendor() {
    // const user = useSelector(authSelect.user);
    const dispatch = useDispatch();
    const [form, setForm] = useState({role: "vendor", username: "", password: "", businessName: "", businessAddress: "",});
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
        // try {
        //    const res = await axios.post("http://localhost:5000/api/auth/register", form, {withCredentials: true});
        //    setSuccessMsg(res.data.msg); // Display message from backend

        //    if (res.data.msg === "Registration successful") {
        //     await dispatch(loginUser({username: form.username, password: form.password}));
        //     setTimeout(() => {
        //         navigate("/view-products");
        //     }, 1000);
        //    }
        // } catch (err) {
        // if (err.response && err.response.data) {
        //     setError(err.response.data.msg); // Show errors from backend 
        // } else {
        //     setError("Network error: " + err.message);
        // }
        // } finally {
        // setLoading(false);
        // }

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

    return (
        <div>
            <h2>Register as Vendor</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value.trim()})}/>
                <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})}/>
                <input placeholder="Business Name" onChange={e => setForm({...form, businessName: e.target.value})}/>
                <input placeholder="Business Address" onChange={e => setForm({...form, businessAddress: e.target.value})}/>
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