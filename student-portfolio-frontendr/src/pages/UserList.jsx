import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/users/all",
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")
          }
        }
      );

      console.log("USERS => ", res.data);

      setUsers(res.data);

    } catch (error) {
      console.log("LOAD USERS ERROR => ", error);
    }
  };

  const changeRole = async (id, role) => {

    try {

      await axios.put(
  `http://localhost:8080/users/role/${id}?role=${role}`,
        {},
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")
          }
        }
      );

      alert("Role Updated Successfully");

      loadUsers();

    } catch (error) {
      console.log(error);
      alert("Role Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>User Management</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          textAlign: "center"
        }}
      >

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                <button
                  onClick={() =>
                    changeRole(user.id, "ADMIN")
                  }
                >
                  Make Admin
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    changeRole(user.id, "STUDENT")
                  }
                >
                  Make Student
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserList;