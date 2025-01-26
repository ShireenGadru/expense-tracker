import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/v1/register", formData)
      .then(() => {
        console.log("successfully registered");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" name="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
