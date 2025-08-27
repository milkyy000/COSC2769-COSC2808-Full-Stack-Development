import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../src/redux/productSlice";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomerProductView() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <ul>
            {items.map((product) => (
                <li key={product.id}>{product.name} - ${product.price}</li>
            ))}
        </ul>
    );
}