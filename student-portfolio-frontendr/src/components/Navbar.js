import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#282c34",
        padding: "15px",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/students"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Students
      </Link>

      <Link
        to="/add-student"
        style={{
          color: "white",
          marginRight: "20px",
          textDecoration: "none",
        }}
      >
        Add Student
      </Link>

      <button
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;