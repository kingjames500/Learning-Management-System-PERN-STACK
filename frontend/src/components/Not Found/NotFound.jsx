import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-xl text-gray-800 mb-8">
        We cannot find the page you were looking for.
      </p>
      <button
        onClick={goHome}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
