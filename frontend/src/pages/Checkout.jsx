import React, { useState, useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import countries from "../data/countries";

const Checkout = () => {
  const { getCartTotal, currency, delivery_fee = 0, getCartItems } = useContext(
    ShopContext
  );

  const { totalAmount = 0, grandTotal = 0 } = getCartTotal() || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: ""
  });

  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = method => {
    setSelectedMethod(method);
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      alert("Please select a payment method before placing the order.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      items: getCartItems(),
      totalAmount,
      deliveryFee: delivery_fee,
      grandTotal,
      status: "Ready to ship"
    }; // Add this if available

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* 📦 Billing/Shipping Form */}
          <div className="col-md-7">
            <div className="fs-2 fw-semibold text-center">
              <Title text1={"Delivery"} text2={"Information"} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Country</label>
              <select
                className="form-select"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country, index) =>
                  <option key={index} value={country}>
                    {country}
                  </option>
                )}
              </select>
            </div>
          </div>

          {/* 💰 Order Summary + Payment Method */}
          <div className="col-md-5">
            <div className="fs-2 fw-semibold text-center">
              <Title text1={"Order"} text2={" Summary"} />
            </div>

            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>
                  {currency}
                  {totalAmount.toFixed(2)}
                </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <strong>
                  {currency}
                  {delivery_fee.toFixed(2)}
                </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between text-black fw-bold fs-5">
                <span>Total</span>
                <span>
                  {currency}
                  {grandTotal.toFixed(2)}
                </span>
              </li>
            </ul>
            <p className="text-muted small">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>

            <div className="fs-2 fw-semibold text-center mt-2 mb-0">
              <Title text1={"Payment"} text2={"Method"} />
            </div>

            <div className="d-flex flex-column flex-lg-row gap-1">
              {["stripe", "razorpay", "cod"].map(method =>
                <label
                  key={method}
                  className={`d-flex align-items-center gap-1 border p-1 px-1 rounded cursor-pointer ${selectedMethod ===
                  method
                    ? "border-success"
                    : "border-secondary"}`}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={selectedMethod === method}
                    onChange={() => handleSelect(method)}
                    className="d-none"
                  />
                  <div
                    className={`min-w-[14px] h-[14px] border rounded-circle d-flex align-items-center justify-content-center ${selectedMethod ===
                    method
                      ? "border-success"
                      : "border-secondary"}`}
                  >
                    {selectedMethod === method &&
                      <div
                        style={{ width: "8px", height: "8px" }}
                        className="bg-success rounded-circle"
                      />}
                  </div>
                  {method !== "cod"
                    ? <img
                        src={
                          method === "stripe"
                            ? assets.stripe_logo
                            : assets.razorpay_logo
                        }
                        alt={method}
                        className="h-5 mx-4"
                      />
                    : <p className="text-muted small fw-medium mx-4 mb-0">
                        CASH ON DELIVERY
                      </p>}
                </label>
              )}
            </div>

            <div className="text-end mt-4">
              <button type="submit" className="btn bg-black text-white w-50">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
