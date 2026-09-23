import axios from "axios";

const API_URL = "http://localhost:8080/student";

export const getStats = () => {
  return axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};