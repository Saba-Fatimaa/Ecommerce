import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = () => {
  return (
    <div
      className="bg-light py-2 px-4 d-flex justify-content-between align-items-center position-fixed top-0 start-0 end-0 border-bottom shadow-sm"
      style={{ height: "70px", zIndex: 1040 }}
    >
      {/* Logo on the left */}
      <img src={assets.logo} alt="Logo" style={{ width: "max(10%, 80px)" }} />

      {/* Logout button on the right */}
      <button className="btn btn-dark px-4 py-2 rounded-pill">Logout</button>
    </div>
  );
};

export default Navbar;
