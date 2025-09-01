import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";
import axios from "axios";

export default function OrderView() {
    const user = useSelector(authSelect.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    
}