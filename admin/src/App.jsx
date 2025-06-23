import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

const App = () => {
  const [token, setToken] = useState(null);
  const location = useLocation();

  const isLoggedIn = !!token;

  // Protect private routes
  const PrivateRoute = ({ children }) => {
    return isLoggedIn
      ? children
      : <Navigate to="/login" state={{ from: location }} replace />;
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Show navbar and sidebar only if logged in */}
      {isLoggedIn && <Navbar />}
      {isLoggedIn && <hr className="my-0" />}

      <div className="d-flex">
        {isLoggedIn &&
          <div
            className="bg-white border-end"
            style={{ width: "250px", minHeight: "100vh" }}
          >
            <Sidebar />
          </div>}

        <div
          className={`flex-grow-2 px-4 py-4 text-secondary ${!isLoggedIn
            ? "w-100"
            : ""}`}
        >
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <Add />
                </PrivateRoute>
              }
            />
            <Route
              path="/list"
              element={
                <PrivateRoute>
                  <List />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            {/* Default redirect */}
            <Route
              path="*"
              element={
                <Navigate to={isLoggedIn ? "/list" : "/login"} replace />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
