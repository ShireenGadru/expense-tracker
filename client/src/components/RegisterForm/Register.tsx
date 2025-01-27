import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/user/v1/register", formData)
      .then(() => {
        console.log("successfully registered");
        navigate("/login"); // TODO: add a success message, then on click of button ,go to login page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData?.firstName}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData?.lastName}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formData?.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={formData?.password}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
