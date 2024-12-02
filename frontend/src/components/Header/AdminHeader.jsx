import React, { useContext } from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import userDetailsStore from "@/Store/userStoreDetails";

// Ensure the correct path

const AdminHeader = () => {
  const user = userDetailsStore((state) => state.user);
  return (
    <header className="bg-white-600 text-indigo-600 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <GraduationCap size="32" />
        <span className="text-xl font-bold capitalize">
          Learning management system
        </span>
      </div>
    </header>
  );
};

export default AdminHeader;
