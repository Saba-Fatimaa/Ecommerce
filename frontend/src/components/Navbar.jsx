import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, [location]); // Update on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light px-3 py-2">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img src={assets.logo} alt="Logo" width="80" />
      </Link>

      {/* Mobile Right Icons */}
      <div className="d-flex align-items-center ms-auto d-sm-none gap-3">
        <img
          src={assets.search_icon}
          alt="Search"
          width="20"
          className="cursor-pointer"
        />

        {/* Mobile Profile Dropdown */}
        <div className="dropdown">
          <img
            src={assets.profile_icon}
            alt="Profile"
            width="20"
            className="dropdown-toggle cursor-pointer"
            role="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="profileDropdown"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/orders" className="dropdown-item">Orders</Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="dropdown-item">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="position-relative">
          <img src={assets.cart_icon} alt="Cart" width="20" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {cartCount}
          </span>
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setVisible(!visible)}
          aria-controls="navbarNav"
          aria-expanded={visible}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

      {/* Main Navigation */}
      <div
        className={`collapse navbar-collapse ${visible ? "show" : ""} d-sm-flex justify-content-center align-items-center`}
        id="navbarNav"
      >
        <ul className="navbar-nav mx-auto mb-2 mb-sm-0 d-flex flex-column flex-sm-row gap-3">
          {navItems.map(({ to, label }) => {
            const isActive = location.pathname === to;

            return (
              <li
                key={to}
                className="nav-item text-center d-flex flex-column align-items-center"
              >
                <NavLink
                  to={to}
                  className={({ isActive }) => "nav-link px-0" + (isActive ? " active" : "")}
                  onClick={() => setVisible(false)}
                >
                  {label}
                </NavLink>
                {isActive && (
                  <hr
                    className="ms-auto mt-1"
                    style={{ width: "50%", borderTop: "2px solid black" }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Icons */}
        <div className="d-none d-sm-flex align-items-center gap-3 ms-3">
          <img
            src={assets.search_icon}
            alt="Search"
            width="20"
            className="cursor-pointer"
          />

          <div className="dropdown">
            <img
              src={assets.profile_icon}
              alt="Profile"
              width="20"
              className="dropdown-toggle cursor-pointer"
              role="button"
              id="profileDropdownLarge"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdownLarge"
            >
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/orders" className="dropdown-item">Orders</Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="dropdown-item">Login</Link>
                </li>
              )}
            </ul>
          </div>

          <Link to="/cart" className="position-relative">
            <img src={assets.cart_icon} alt="Cart" width="20" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
