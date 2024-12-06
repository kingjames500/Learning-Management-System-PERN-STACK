import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react"; // Or replace with any other icon library

function Errors({
  error,
  linkPath = "/",
  linkText = "Go to Home",
  Icon = GraduationCap,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-red-100 p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-gray-700 mb-4">{error?.message}</p>
        <Link
          to={linkPath}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          <Icon className="w-5 h-5" />
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default Errors;
