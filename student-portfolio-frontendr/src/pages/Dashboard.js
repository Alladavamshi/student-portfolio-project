import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getStats } from "../api/dashboardApi";

function Dashboard() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    students: 0,
    admins: 0,
    users: 0
  });

  useEffect(() => {

    if (role === "ADMIN") {
      loadStats();
    }

  }, []);

  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>

        {/* ================= ADMIN DASHBOARD ================= */}

        {role === "ADMIN" && (
          <>
            <h1>Admin Dashboard</h1>

            <div style={styles.cardContainer}>

              <div
                style={{
                  ...styles.card,
                  backgroundColor: "#4CAF50"
                }}
              >
                <h2>Total Students</h2>
                <h1>{stats.students}</h1>
              </div>

              <div
                style={{
                  ...styles.card,
                  backgroundColor: "#2196F3"
                }}
              >
                <h2>Total Admins</h2>
                <h1>{stats.admins}</h1>
              </div>

              <div
                style={{
                  ...styles.card,
                  backgroundColor: "#FF9800"
                }}
              >
                <h2>Total Users</h2>
                <h1>{stats.users}</h1>
              </div>

            </div>

            <div style={styles.buttonContainer}>

              <button
                style={styles.btn}
                onClick={() => navigate("/students")}
              >
                Manage Students
              </button>

              <button
                style={styles.btn}
                onClick={() => navigate("/add-student")}
              >
                Add Student
              </button>

              <button
                style={styles.btn}
                onClick={() => navigate("/users")}
              >
                Manage Users
              </button>

              <button
                style={{
                  ...styles.btn,
                  backgroundColor: "red"
                }}
                onClick={logout}
              >
                Logout
              </button>

            </div>
          </>
        )}

        {/* ================= STUDENT DASHBOARD ================= */}

        {role === "STUDENT" && (
          <>
            <h1>Welcome Student</h1>

            <div style={styles.buttonContainer}>

              <button
                style={styles.btn}
                onClick={() => navigate("/students")}
              >
                View Students
              </button>

              <button
                style={styles.btn}
                onClick={() => navigate("/my-profile")}
              >
                My Profile
              </button>

              <button
                style={{
                  ...styles.btn,
                  backgroundColor: "red"
                }}
                onClick={logout}
              >
                Logout
              </button>

            </div>
          </>
        )}

      </div>
    </>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px"
  },

  card: {
    width: "220px",
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
  },

  buttonContainer: {
    marginTop: "40px"
  },

  btn: {
    margin: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#333",
    color: "white",
    cursor: "pointer"
  }
};

export default Dashboard;