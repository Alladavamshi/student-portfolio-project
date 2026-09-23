import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        { email }
      );

      setToken(res.data); // backend returns token
      setMessage("Reset token generated (check below)");
    } catch (err) {
      setMessage(err.response?.data || "Error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Get Reset Token</button>
      </form>

      {message && <p>{message}</p>}

      {token && (
        <div>
          <h4>Your Reset Token:</h4>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;