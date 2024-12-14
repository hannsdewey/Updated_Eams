import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("userToken"); // Example of token check

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected component
  return <Component {...rest} />;
};

export default PrivateRoute;
