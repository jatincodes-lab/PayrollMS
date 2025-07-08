import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or similar
  }
  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />; // Redirect to unauthorized page if user does not have the required role
  }
  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  }
  return user ? children : <Navigate to="/login" />; // If user is authenticated, render children, otherwise redirect to login
};

export default RoleBaseRoute;
