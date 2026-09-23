import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  // ADMIN ONLY PAGES
  const adminRoutes = [
    "/users",
    "/add-student",
  ];

  const isAdminRoute = adminRoutes.includes(
    location.pathname
  );

  if (role === "STUDENT" && isAdminRoute) {
    return <Navigate to="/dashboard" />;
  }

  // Block edit page
  if (
    role === "STUDENT" &&
    location.pathname.startsWith("/edit")
  ) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;