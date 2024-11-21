import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
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
        <Link to="/auth" className="hover:text-slate-800">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
