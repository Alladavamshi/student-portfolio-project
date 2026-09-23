import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDetails() {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/student/my-profile",
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);

      setStudent(res.data);

    } catch (error) {

      console.log("Error:", error);

    }
  };

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1>Student Profile</h1>

      {student.imageName && (
        <img
          src={`http://localhost:8080/student/image/${student.imageName}`}
          alt="student"
          width="200"
        />
      )}

      <h2>{student.name}</h2>

      <p>
        <strong>Email:</strong> {student.email}
      </p>

      <p>
        <strong>Phone:</strong> {student.phone}
      </p>

      <p>
        <strong>Course:</strong> {student.course}
      </p>

      <p>
        <strong>Skills:</strong> {student.skills}
      </p>

      <p>
        <strong>About:</strong> {student.about}
      </p>

    </div>
  );
}

export default StudentDetails;