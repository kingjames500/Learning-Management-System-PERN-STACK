import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import InstructorProvider from "./components/Context/Instructor/InstructorContext";
import AuthProvider from "./components/Context/authContext/authContext";
import StudentProvider from "./components/Context/StudentContext/StudentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StudentProvider>
        <InstructorProvider>
          <App />
        </InstructorProvider>
      </StudentProvider>
    </AuthProvider>
  </StrictMode>,
);
