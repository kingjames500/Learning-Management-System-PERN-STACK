import { initialSignInFormData } from "@/config";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [authDataSignin, setAuthDataSignin] = useState(initialSignInFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
    role: null,
  });

  return (
    <AuthContext.Provider
      value={{
        authDataSignin,
        setAuthDataSignin,
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
