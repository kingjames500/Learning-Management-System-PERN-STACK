import { AuthContext } from "@/components/Context/authContext/authContext";
import userDetailsStore from "@/Store/userStoreDetails";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function logout() {
  const redirect = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const logout = userDetailsStore((state) => state.logout);

  const handleLogout = () => {
    logout(() => {
      console.log("logout hit");
      setAuth({
        authenticate: false,
        user: null,
        role: null,
      });
      redirect("/auth");
    });
  };

  return { handleLogout };
}

export default logout;
