import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext/authContext";
import { Navigate } from "react-router-dom";
import userDetailsStore from "@/Store/userStoreDetails";

function ProtectedRoute({ role, children }) {
  const user = userDetailsStore((state) => state.user);
  const { auth } = useContext(AuthContext);

  const isAuthenticated = auth.authenticate || user;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const userRole = auth.role || user.role;

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
