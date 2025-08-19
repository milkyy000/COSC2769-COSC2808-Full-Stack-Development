// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorProduct = ({ vendorId }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/vendors/${vendorId}/products`);
        setProducts(res.data);
      } catch (err) {
        setMessage("Failed to load products");
      }
    };
    fetchProducts();
  }, [vendorId]);

  return (
    <div>
      <h2>My Products</h2>
      {message && <p>{message}</p>}
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && <img src={`/uploads/${p.image}`} alt={p.name} width="150" />}
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProduct;
