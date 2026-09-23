import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      setErrors({});

      await axios.post(
        "http://localhost:8080/auth/register",
        user
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "10px"
      }}
    >

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p style={{ color: "red" }}>
            {errors.name}
          </p>
        )}

        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p style={{ color: "red" }}>
            {errors.email}
          </p>
        )}

        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        {errors.password && (
          <p style={{ color: "red" }}>
            {errors.password}
          </p>
        )}

        <br />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="STUDENT">
            STUDENT
          </option>

          <option value="ADMIN">
            ADMIN
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;