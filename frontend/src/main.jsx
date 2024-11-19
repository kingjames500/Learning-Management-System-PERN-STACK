import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import InstructorProvider from "./components/Context/Instructor/InstructorContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InstructorProvider>
      <App />
    </InstructorProvider>
  </StrictMode>,
);
