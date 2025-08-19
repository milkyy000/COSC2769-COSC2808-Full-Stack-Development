// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: S4070049

import React, { useState } from "react";
import axios from "axios";
import defaultProfile from "../../assets/profileIMG.png"; // local default preview
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorRegister = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        businessName: "",
        businessAddress: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/vendors/register", form, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <h2 className="card-title mb-4">Vendor Registration</h2>

                            {/* Default profile preview */}
                            <div className="mb-3">
                                <img
                                    src={defaultProfile}
                                    alt="Default Profile"
                                    className="rounded-circle"
                                    width="120"
                                    height="120"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter username"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 text-start">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 text-start">
                                    <label className="form-label">Business Name</label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        className="form-control"
                                        placeholder="Enter business name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 text-start">
                                    <label className="form-label">Business Address</label>
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        className="form-control"
                                        placeholder="Enter business address"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>

                            {message && (
                                <div className="alert alert-info mt-3" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorRegister;
