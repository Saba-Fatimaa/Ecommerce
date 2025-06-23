import React, { useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendUrl + '/api/admin/login', {
        email,
        password,
      });

      if (response.data.token) {
        const { token, admin } = response.data;
      
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(admin));
      
        const from = location.state?.from?.pathname || "/list";
        navigate(from, { replace: true });
      } else {
        alert("Login failed: " + response.data.message);
      }
      
    } catch (error) {
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <form onSubmit={handleLogin} className="p-4 border rounded bg-white shadow" style={{ width: "300px" }}>
        <h4 className="mb-3 text-center">Login</h4>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
