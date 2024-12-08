import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userDetailsStore from "@/Store/userStoreDetails";

function ProtectedRoute({ role, children }) {
  const user = userDetailsStore((state) => state.user);
  const isAuthenticated = user;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const userRole = user.role;

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
