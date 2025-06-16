import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import binIcon from '../assets/frontend_assets/bin_icon.png';
import { Link } from 'react-router-dom'; 

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    delivery_fee,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const { totalItems, totalAmount, grandTotal } = getCartTotal();

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="lead">Your cart is currently empty.</p>
          <Link to="/collection" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* 🛒 Cart Items */}
          {cartData.map((item, index) => {
            const product = products.find(p => p._id === item._id);
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
                    {currency}{product.price} &middot; Size: <span className="badge bg-secondary">{item.size}</span>
                  </small>
                </div>
                <div className="col-4 col-md-3">
                  <div className="input-group input-group-sm">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
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
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
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
                    onClick={() => removeFromCart(item._id, item.size)}
                  />
                </div>
              </div>
            );
          })}

          {/* 🧾 Cart Summary */}
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

                {/* 🧾 Checkout Button */}
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
