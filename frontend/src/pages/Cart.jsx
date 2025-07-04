import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import binIcon from '../assets/frontend_assets/bin_icon.png';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currency = 'PKR';
  const delivery_fee = 150;

  // Format currency values
  const formatPrice = (value) => `${currency} ${value.toFixed(2)}`;

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setCartItems(data.items || []);
      } else {
        console.error(data.message || 'Failed to load cart');
      }
    } catch (err) {
      console.error('Error loading cart:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (productId, size, quantity) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size, quantity }),
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error('Failed to update quantity:', err.message);
    }
  };

  const removeCartItem = async (productId, size) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size }),
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error('Failed to remove item:', err.message);
    }
  };

  const getCartTotal = () => {
    let totalItems = 0;
    let totalAmount = 0;

    cartItems.forEach((item) => {
      const price = item?.productId?.price || 0;
      const qty = item?.quantity || 0;
      totalItems += qty;
      totalAmount += price * qty;
    });

    return {
      totalItems,
      totalAmount,
      grandTotal: totalAmount + delivery_fee,
    };
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const { totalItems, totalAmount, grandTotal } = getCartTotal();

  if (loading) return <div className="text-center py-5">Loading cart...</div>;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartItems.length === 0 ? (
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
            if (!product || !product.name) return null;

            const imageUrl = product.image?.length
              ? product.image[0].startsWith('http')
                ? product.image[0]
                : `${BASE_URL}/uploads/${product.image[0]}`
              : '/placeholder.jpg';

            const itemTotal = product.price * item.quantity;

            return (
              <div key={index} className="row align-items-center py-3 border-top">
                <div className="col-3 col-md-2">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: '80px' }}
                  />
                </div>
                <div className="col-5 col-md-4">
                  <h6 className="mb-1">{product.name}</h6>
                  <small className="text-muted">
                    {formatPrice(product.price)} &middot; Size:{' '}
                    <span className="badge bg-secondary">{item.size}</span>
                  </small>
                </div>
                <div className="col-4 col-md-3">
                  <div className="input-group input-group-sm">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateCartQuantity(product._id, item.size, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={item.quantity}
                      readOnly
                      style={{ maxWidth: '50px' }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      disabled={item.quantity >= 10}
                      onClick={() =>
                        updateCartQuantity(product._id, item.size, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-6 col-md-2 text-end fw-semibold">
                  {formatPrice(itemTotal)}
                </div>
                <div className="col-6 col-md-1 text-end">
                  <img
                    src={binIcon}
                    alt="Delete"
                    style={{ width: '20px', cursor: 'pointer' }}
                    onClick={() => removeCartItem(product._id, item.size)}
                  />
                </div>
              </div>
            );
          })}

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
                  <strong>{formatPrice(totalAmount)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping Fee:</span>
                  <strong>{formatPrice(delivery_fee)}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold text-black mb-4">
                  <span>Grand Total:</span>
                  <span>{formatPrice(grandTotal)}</span>
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
