import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light px-3 py-2">
      {/* Logo always visible */}
      <Link className="navbar-brand" to="/">
        <img src={assets.logo} alt="Logo" width="80" />
      </Link>

      {/* On small screens: icons + hamburger grouped */}
      <div className="d-flex align-items-center ms-auto d-sm-none gap-3">
        {/* Search icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          width="20"
          className="cursor-pointer"
        />
        {/* Profile dropdown */}
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
            <li>
              <p className="dropdown-item">My Profile</p>
            </li>
            <li>
              <p className="dropdown-item">Orders</p>
            </li>
            <li>
              <p className="dropdown-item">Logout</p>
            </li>
          </ul>
        </div>

        {/* Cart icon */}
        <Link to="/cart" className="position-relative">
          <img src={assets.cart_icon} alt="Cart" width="20" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {/* cart count here */}
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setVisible(!visible)}
          aria-controls="navbarNav"
          aria-expanded={visible}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* On sm+ screens: full menu + icons */}
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
                className="nav-item text-center d-flex flex-column align-items-end"
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "nav-link px-0" + (isActive ? " active" : "")
                  }
                  onClick={() => setVisible(false)} // close menu on click (mobile)
                >
                  {label}
                </NavLink>
                {isActive && (
                  <hr
                    className="ms-auto me-0 mt-1"
                    style={{ width: "25%", borderTop: "2px solid black" }}
                  />

                )}
              </li>
            );
          })}
        </ul>

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
              <li>
                <p className="dropdown-item">My Profile</p>
              </li>
              <li>
                <p className="dropdown-item">Orders</p>
              </li>
              <li>
                <p className="dropdown-item">Logout</p>
              </li>
            </ul>
          </div>

          <Link to="/cart" className="position-relative">
            <img src={assets.cart_icon} alt="Cart" width="20" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {/* cart count here */}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
