import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setErrorMsg("");

      const res = await loginUser({
        email,
        password,
      });

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      if (error.response?.data) {

        setErrorMsg(error.response.data);

      } else {

        setErrorMsg("Login Failed");

      }
    }
  };

  const googleLogin = () => {

    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";

  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

       {errorMsg && (
  <div style={{ color: "red" }}>

    <p>{errorMsg}</p>

    <p>
      Don't have an account?{" "}
      <Link to="/register" style={{ color: "blue" }}>
        Register here
      </Link>
    </p>

  </div>
)}
        

        <button type="submit">
          Login
        </button>

        <br />
<br />

<Link to="/forgot-password">
  Forgot Password?
</Link>

      </form>

      <br />

      <button
        type="button"
        onClick={googleLogin}
      >
        Login with Google
      </button>

    </div>
  );
}

export default Login;