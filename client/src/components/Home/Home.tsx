import { Link } from "react-router-dom";
import axios from "axios";
export const Home = () => {
  const handleLogout = async () => {
    try {
      await axios.get("/api/user/v1/logout", {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      // Handle successful logout, e.g., redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      Home
      <br />
      <Link to="/register">Register User </Link>
      <br />
      <Link to="/login">Login </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
