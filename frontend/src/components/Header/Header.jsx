import { useContext } from "react";
import AdminHeader from "./AdminHeader";
import StudentHeader from "./StudentHeader";
import { AuthContext } from "../Context/authContext/authContext";

function Header() {
  const { auth } = useContext(AuthContext);
  console.log(auth.role);

  return (
    <> {auth.role === "instructor" ? <AdminHeader /> : <StudentHeader />} </>
  );
}

export default Header;
