import userDetailsStore from "@/Store/userStoreDetails";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const storedUser = userDetailsStore.getState().user;
    if (storedUser) {
      setAuth({
        authenticate: true,
        user: storedUser,
        role: storedUser.role,
      });
    }
  }, []);

  useEffect(() => {
    if (auth.authenticate) {
      userDetailsStore.setState({ user: auth.user });
    } else {
      userDetailsStore.setState({ user: null });
    }
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
