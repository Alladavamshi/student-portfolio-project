import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents, deleteStudent } from "../api/studentApi";
import Navbar from "../components/Navbar";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Student Deleted Successfully");
      loadStudents();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Student List</h1>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search Student Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {students
            .filter((student) =>
              student.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((student) => (
              <div
                key={student.id}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  textAlign: "center",
                }}
              >
                {student.imageName && (
                  <img
                    src={`http://localhost:8080/student/image/${student.imageName}`}
                    alt="student"
                    width="120"
                    height="120"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}

                <h2>{student.name}</h2>

                <p>
                  <strong>Email:</strong> {student.email}
                </p>

                <p>
                  <strong>Course:</strong> {student.course}
                </p>
<div style={{ marginTop: "10px" }}>

  <button
    onClick={() => navigate(`/student/${student.id}`)}
    style={{
      background: "green",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    View
  </button>

  {role === "ADMIN" && (
    <>
      <button
        onClick={() => navigate(`/edit/${student.id}`)}
        style={{
          background: "#2196F3",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(student.id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Delete
      </button>
    </>
  )}

</div>
                
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudentList;