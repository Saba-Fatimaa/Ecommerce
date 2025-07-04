import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const Login = () => {
  const navigate = useNavigate(); // ✅ Step 2
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
    const payload = { ...formData };
    if (isLogin) delete payload.fullName;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage({ type: "success", text: data.message || "Success!" });

      if (!isLogin) {
        setIsLogin(true);
        setFormData({ fullName: "", email: "", password: "" });
      }

      if (isLogin && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // ✅ Step 3: Redirect to home
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <form
      className="container mt-5 p-4 border rounded shadow-sm"
      style={{ maxWidth: "400px" }}
      onSubmit={handleSubmit}
    >
      <div className="text-center mb-4">
        <h3>
          {isLogin ? "Login" : "Sign Up"}
        </h3>
      </div>

      {!isLogin &&
        <div className="mb-3">
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>}

      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        {isLogin &&
          <small className="text-primary">Forgot your password?</small>}
        <small
          className="text-primary cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage({ type: "", text: "" });
          }}
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </small>
      </div>

      {message.text &&
        <div
          className={`alert alert-${message.type === "error"
            ? "danger"
            : "success"} py-2`}
        >
          {message.text}
        </div>}

      <button type="submit" className="btn btn-dark w-100">
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
