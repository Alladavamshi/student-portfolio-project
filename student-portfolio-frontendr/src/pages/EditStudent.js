import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStudentById,
  updateStudent,
  uploadImage
} from "../api/studentApi";

const EditStudent = () => {
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    skills: "",
    about: "",
    imageName: ""
  });

  const [file, setFile] = useState(null);

  // LOAD STUDENT
  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      const res = await getStudentById(id);
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // UPDATE STUDENT DETAILS
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, student);
      alert("Student Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // IMAGE UPLOAD
  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    try {
      const res = await uploadImage(id, file);
      alert("Image Uploaded Successfully");

      // refresh data
      setStudent(res.data);
    } catch (err) {
      console.log(err);
      alert("Image Upload Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Student</h2>

      {/* SHOW IMAGE */}
      {student.imageName && (
        <div>
          <h4>Profile Image</h4>
          <img
            src={`http://localhost:8080/student/image/${student.imageName}`}
            alt="student"
            width="150"
            height="150"
            style={{ borderRadius: "10px" }}
          />
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleUpdate}>

        <input
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />

        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />

        <input
          name="phone"
          value={student.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <br />

        <input
          name="course"
          value={student.course}
          onChange={handleChange}
          placeholder="Course"
        />
        <br />

        <input
          name="skills"
          value={student.skills}
          onChange={handleChange}
          placeholder="Skills"
        />
        <br />

        <textarea
          name="about"
          value={student.about}
          onChange={handleChange}
          placeholder="About"
        />
        <br />

        <button type="submit">
          Update Student
        </button>

      </form>

      <hr />

      {/* IMAGE UPLOAD */}
      <h3>Upload Image</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <button type="button" onClick={handleImageUpload}>
        Upload Image
      </button>
    </div>
  );
};

export default EditStudent;