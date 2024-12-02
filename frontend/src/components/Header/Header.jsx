import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import userDetailsStore from "@/Store/userStoreDetails";
import StudentHeader from "./StudentHeader";
import AdminHeader from "./AdminHeader";

function Header() {
  const user = userDetailsStore((state) => state.user);
  const role = user ? user.role : null;

  return (
    <>
      {role === "instructor" ? (
        <AdminHeader />
      ) : role === "student" ? (
        <StudentHeader />
      ) : (
        <div className="flex items-center justify-between space-x-2 p-4 bg-gray-100 text-blue-600 text-2xl">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">Learning Management System</span>
            <GraduationCap className="h-8 w-8" />
          </div>
          <Link to="/auth" className="text-blue-600">
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;
