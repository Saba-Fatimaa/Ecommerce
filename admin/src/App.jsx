import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

const App = () => {
  // const [token, setToken] = useState(""); 

  return (
    <div className="bg-light min-vh-100">
      {/* {token === "" ? (
        <Login setToken={setToken}/>
      ) : ( */}
        <>
          {/* Navbar at the top */}
          <Navbar />
          <hr className="my-0" />

          <div className="d-flex w-100">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-grow-1 px-4 py-4 text-secondary">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default App;
