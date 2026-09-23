import axios from "./axiosConfig";

// GET ALL
export const getAllStudents = () => axios.get("/student/all");

// GET BY ID
export const getStudentById = (id) =>
  axios.get(`/student/${id}`);

// ADD
export const addStudent = (student) =>
  axios.post("/student/add", student);

// UPDATE
export const updateStudent = (id, student) =>
  axios.put(`/student/update/${id}`, student);

// DELETE
export const deleteStudent = (id) =>
  axios.delete(`/student/delete/${id}`);

// IMAGE UPLOAD
export const uploadImage = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`/student/upload/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};