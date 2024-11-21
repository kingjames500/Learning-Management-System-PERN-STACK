import userDetailsStore from "@/Store/userStoreDetails";
import AdminHeader from "./AdminHeader";
import StudentHeader from "./StudentHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Header() {
  const navigate = useNavigate();
  const user = userDetailsStore((state) => state.user);
  useEffect(() => {
    if (!user || !user.role) {
      navigate("/auth");
    }
  }, [user, navigate]);
  if (!user || !user.role) {
    return null;
  }

  return (
    <> {user.role === "instructor" ? <AdminHeader /> : <StudentHeader />} </>
  );
}

export default Header;
