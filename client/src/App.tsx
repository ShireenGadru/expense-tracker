import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home/Home";
import { Register } from "./components/RegisterForm/Register";
import { LoginForm } from "./components/LoginForm/LoginForm";

function App() {
  return (
    <>
      <Link to="/">Home </Link>
      <br />
      <br />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
