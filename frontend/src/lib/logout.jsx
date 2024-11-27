import { AuthContext } from "@/components/Context/authContext/authContext";
import userDetailsStore from "@/Store/userStoreDetails";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function useLogout() {
  const redirect = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const logoutZustand = userDetailsStore((state) => state.logout); // Zustand logout function

  const handleLogout = () => {
    // Call Zustand logout and execute callback
    logoutZustand(() => {
      console.log("Logout hit");

      // Clear AuthContext state
      setAuth({
        authenticate: false,
        user: null,
        role: null,
      });

      // Redirect to login or auth page
      toast.success("Logout successful. Redirecting to login page...");
      setTimeout(() => {
        redirect("/auth");
      }, 1000);
    });
  };

  return { handleLogout };
}

export default useLogout;
