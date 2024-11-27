import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { auth } = useContext(AuthContext);

  if (!auth.authenticate) {
    return <Navigate to="/auth" />;
  }

  if (auth.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
