import React, { useContext } from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext/authContext";
// Ensure the correct path

const AdminHeader = () => {
  const { auth } = useContext(AuthContext);
  return (
    <header className="bg-white-600 text-indigo-600 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <GraduationCap size="32" />
        <span className="text-xl font-bold capitalize">
          Learning management system
        </span>
      </div>
      <nav className="space-x-8 list-none text-xl capitalize">
        <Link to="/" className="hover:text-slate-800">
          Home
        </Link>
        <Link to="/courses" className="hover:text-slate-800">
          Courses
        </Link>
        {auth.authenticate && auth.role === "instructor" ? (
          <>
            <Link to="/profile" className="hover:text-slate-800">
              Profile
            </Link>
            <Link
              to="/logout"
              className="hover:text-slate-800"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to="/auth" className="hover:text-slate-800">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default AdminHeader;
