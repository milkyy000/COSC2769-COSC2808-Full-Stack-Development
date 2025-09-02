import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelect } from "../../src/redux/authSlice";
import axios from "axios";

export default function ShoppingCartView() {
  const user = useSelector(authSelect.user);
  const [shoppingCart, setShoppingCart] = useState(null); // single cart object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Shopping Cart | VeloCart";
  }, []);
  // fetch the shopping cart
  const fetchShoppingCart = async () => {
    if (!user?._id) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:5000/api/carts/${user._id}/shoppingCart`,
        { withCredentials: true }
      );
      setShoppingCart(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // update quantity
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return; // prevent going below 1
    try {
      const res = await axios.put(
        `http://localhost:5000/api/carts/${user._id}/shoppingCart`,
        { productId, quantity: newQty },
        { withCredentials: true }
      );
      setShoppingCart(res.data);
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  // remove product
  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/carts/${user._id}/shoppingCart/${productId}`,
        { withCredentials: true }
      );
      setShoppingCart(res.data);
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  const handleOrder = async (req, res) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/carts/${user._id}/createOrder`,
        { withCredentials: true }
      );
      setShoppingCart(res.data);
      console.log("created order shoppingcartview.jsx");
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  }

  useEffect(() => {
    fetchShoppingCart();
  }, [user]);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;
  if (!shoppingCart || shoppingCart.items?.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mt-4">
      <h2 className="d-inline-block me-2" >Your Shopping Cart</h2>
      <button className="btn btn-success align-middle mb-2" onClick={() => handleOrder()}>🛒 Create order 🛒</button>
      <ul className="list-group">
        {shoppingCart.items.map((item) => (
          <li
            key={item.product._id}
            className="list-group-item d-flex justify-content-between align-items-center border rounded p-2 mb-2 shadow-sm"
          >
            {/* Product Image */}
            <img
              src={`http://localhost:5000/uploads/${item.product.image || "default.png"}`}
              alt={item.product.name}
              className="img-thumbnail me-3"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />

            {/* Product Details */}
            <div className="flex-grow-1">
              <strong>{item.product.name}</strong> <br />
              ${item.product.price} each
            </div>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-secondary mx-1"
                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary mx-1"
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => removeItem(item.product._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}
