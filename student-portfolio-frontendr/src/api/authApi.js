import api from "./axiosConfig";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};