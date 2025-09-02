import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";
import axios from "axios";

export default function OrderView() {
    const user = useSelector(authSelect.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        if (!user?._id) return;
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(
                `http://localhost:5000/api/orders/${user._id}`,
                { withCredentials: true }
            );
            console.log(res.data);
            setOrders(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch orders:", err);
            setError("Failed to load orders. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchOrders();
      }, [user]);

    return (
        <>

        </>
    )
}