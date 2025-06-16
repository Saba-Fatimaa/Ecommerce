import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
    <form className="container mt-5 p-4 " style={{ maxWidth: "400px" }}>
      <div className="d-flex align-items-center gap-2 justify-content-center mb-4">
        <h3 className="m-0 px-2">
          {currentState}{" "}
        </h3>
        <hr className="border-2 border-dark m-0" style={{ width: "60px" }} />
      </div>

      {currentState === "Sign Up" &&
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Full Name" />
        </div>}

      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <small className="text-primary cursor-pointer">
          Forgot your password?
        </small>
        <small
          className="text-primary cursor-pointer"
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
        >
          {currentState === "Login" ? "Create an account" : "Login"}
        </small>
      </div>

      <button type="submit" className="btn btn-dark w-100">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
