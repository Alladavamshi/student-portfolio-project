import React, { useState } from "react";
import { addStudent, uploadImage } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    skills: "",
    about: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Save student first
      const res = await addStudent(student);
      const studentId = res.data.id;

      // 2. Upload image if selected
      if (file) {
        await uploadImage(studentId, file);
      }

      alert("Student Added Successfully");
      navigate("/students");

    } catch (err) {
      console.log(err);
      alert("Error adding student");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br /><br />
        <input name="course" placeholder="Course" onChange={handleChange} /><br /><br />
        <input name="skills" placeholder="Skills" onChange={handleChange} /><br /><br />
        <input name="about" placeholder="About" onChange={handleChange} /><br /><br />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        /><br /><br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;