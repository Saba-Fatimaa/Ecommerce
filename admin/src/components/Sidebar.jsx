import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div
      className="bg-white shadow border-end position-fixed"
      style={{
        width: "220px",
        height: "calc(100vh - 56px)",
        top: "65px",
        left: 0,
        zIndex: 1020
      }}
    >
      <div
        className="d-flex flex-column gap-3 pt-4 px-3 mt-2"
        style={{ fontSize: "15px" }}
      >
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `text-decoration-none nav-link sidebar-link text-dark ${isActive
              ? "active-link"
              : ""}`}
        >
          <div className="d-flex align-items-center gap-3 px-3 py-2 rounded">
            <img
              src={assets.add_icon}
              alt="Add Icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="d-none d-md-inline">Add Items</span>
          </div>
        </NavLink>

        <NavLink
          to="/list-items"
          className={({ isActive }) =>
            `text-decoration-none nav-link sidebar-link text-dark ${isActive
              ? "active-link"
              : ""}`}
        >
          <div className="d-flex align-items-center gap-3 px-3 py-2 rounded">
            <img
              src={assets.order_icon}
              alt="List Icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="d-none d-md-inline">List Items</span>
          </div>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `text-decoration-none nav-link sidebar-link text-dark ${isActive
              ? "active-link"
              : ""}`}
        >
          <div className="d-flex align-items-center gap-3 px-3 py-2 rounded">
            <img
              src={assets.order_icon}
              alt="Orders Icon"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="d-none d-md-inline">Orders</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
