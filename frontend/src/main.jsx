import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import InstructorProvider from "./components/Context/Instructor/InstructorContext";
import AuthProvider from "./components/Context/authContext/authContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <InstructorProvider>
        <App />
      </InstructorProvider>
    </AuthProvider>
  </StrictMode>,
);
