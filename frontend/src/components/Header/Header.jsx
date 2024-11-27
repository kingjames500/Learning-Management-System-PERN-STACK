import { useContext } from "react";
import AdminHeader from "./AdminHeader";
import StudentHeader from "./StudentHeader";
import { AuthContext } from "../Context/authContext/authContext";

function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <> {auth.role === "instructor" ? <AdminHeader /> : <StudentHeader />} </>
  );
}

export default Header;
