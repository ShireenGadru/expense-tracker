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
      <p className="text-blue-500 text-3xl">Expense Tracker App</p>
      <br />
      <button>
        {" "}
        <Link to="/register">Register User </Link>
      </button>

      <br />
      <button>
        {" "}
        <Link to="/login">Login </Link>
      </button>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};
