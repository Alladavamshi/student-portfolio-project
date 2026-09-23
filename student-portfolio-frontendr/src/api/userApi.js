import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getAllUsers = () => {
  return axios.get(API_URL + "/all", {
    headers: {
      Authorization:
        "Bearer " + localStorage.getItem("token"),
    },
  });
};

export const deleteUser = (id) => {
  return axios.delete(
    API_URL + "/delete/" + id,
    {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};

export const changeRole = (id, role) => {
  return axios.put(
    API_URL +
      "/role/" +
      id +
      "?role=" +
      role,
    {},
    {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};