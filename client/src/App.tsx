import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home/Home";
import { Register } from "./components/RegisterForm/Register";

function App() {
  return (
    <>
      <Link to="/">Home </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
