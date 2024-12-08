import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link } from "react-router-dom";
import userDetailsStore from "@/Store/userStoreDetails";
import useLogout from "@/lib/logout";

function StudentHeader() {
  const user = userDetailsStore((state) => state.user);
  const logout = useLogout();

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Link
            to="/student"
            className="text-[14px] md:text-[16px] font-medium hover:text-black"
          >
            Explore Courses
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          user.role === "student" ? (
            <div className="flex gap-4 items-center">
              <Link
                to="/student/enrolled-courses"
                className="flex cursor-pointer items-center gap-3"
              >
                <span className="font-extrabold md:text-xl text-[14px]">
                  My Courses
                </span>
                <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
              </Link>
              <Link to="/profile" className="hover:text-black">
                {user.username}
              </Link>
              <Link
                to="/auth"
                className="hover:text-black"
                onClick={() => {
                  logout.handleLogout();
                }}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/auth" className="hover:text-black">
                Login
              </Link>
            </div>
          )
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/auth" className="hover:text-black">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default StudentHeader;
