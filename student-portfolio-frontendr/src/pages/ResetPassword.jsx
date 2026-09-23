import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/reset-password",
        {
          token,
          newPassword,
        }
      );

      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Enter reset token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;