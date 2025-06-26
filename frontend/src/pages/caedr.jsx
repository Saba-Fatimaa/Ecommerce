import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import binIcon from '../assets/frontend_assets/bin_icon.png';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency] = useState("Rs");
  const [delivery_fee] = useState(250); // You can make this dynamic too

  // 🔄 Fetch cart from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Failed to load cart:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Update item quantity
  const updateQuantity = async (productId, size, quantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/cart/add",
        { productId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating cart", err);
    }
  };

  // 🗑 Remove item from cart
  const removeItem = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/cart/remove",
        { productId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🧾 Totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const grandTotal = totalAmount + delivery_fee;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <Title text1="YOUR" text2="CART" />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="lead">Your cart is currently empty.</p>
          <Link to="/collection" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item, index) => {
            const product = item.productId;
            if (!product) return null;
            const itemTotal = product.price * item.quantity;

            return (
              <div key={index} className="row align-items-center py-3 border-top">
                <div className="col-3 col-md-2">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '80px' }}
                  />
                </div>
                <div className="col-5 col-md-4">
                  <h6 className="mb-1">{product.name}</h6>
                  <small className="text-muted">
                    {currency}{product.price} &middot; Size:{' '}
                    <span className="badge bg-secondary">{item.size}</span>
                  </small>
                </div>
                <div className="col-4 col-md-3">
                  <div className="input-group input-group-sm">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(product._id, item.size, item.quantity - 1)}
                    >-</button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={item.quantity}
                      readOnly
                      style={{ maxWidth: '50px' }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(product._id, item.size, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
                <div className="col-6 col-md-2 text-end fw-semibold">
                  {currency}{itemTotal.toFixed(2)}
                </div>
                <div className="col-6 col-md-1 text-end">
                  <img
                    src={binIcon}
                    alt="Delete"
                    style={{ width: '20px', cursor: 'pointer' }}
                    onClick={() => removeItem(product._id, item.size)}
                  />
                </div>
              </div>
            );
          })}

          {/* Order Summary */}
          <div className="row mt-5">
            <div className="col-lg-6 offset-lg-3">
              <div className="p-4 border rounded shadow-sm bg-light">
                <h4 className="fw-bold text-center mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Items:</span>
                  <strong>{totalItems}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <strong>{currency}{totalAmount.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping Fee:</span>
                  <strong>{currency}{delivery_fee.toFixed(2)}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold text-black mb-4">
                  <span>Grand Total:</span>
                  <span>{currency}{grandTotal.toFixed(2)}</span>
                </div>
                <div className="text-center">
                  <Link to="/checkout" className="btn bg-black btn-sm text-white px-5">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
