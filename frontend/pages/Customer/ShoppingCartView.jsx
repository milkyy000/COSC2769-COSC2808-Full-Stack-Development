import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";
import axios from "axios";

export default function ShoppingCartView() {
    const user = useSelector(authSelect.user);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    const fetchShoppingCart = async () => {
        if (!user?._id) return;
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`http://localhost:5000/api/customer/${user.customerId}/shoppingCart`, { withCredentials: true });
            setShoppingCart(res.data);
        } catch (err) {
            console.error("❌ Failed to fetch products:", err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchShoppingCart()},
        [user]
    );
    return(
        <>
        
        </>
    )
}