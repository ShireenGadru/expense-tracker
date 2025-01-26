import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      Home
      <br />
      <Link to="/register">Register User </Link>
    </div>
  );
};
