import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  changeRole,
} from "../api/userApi";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      const res = await getAllUsers();

      console.log("USERS DATA =", res.data);

      setUsers(res.data);

    } catch (error) {

      console.log("ERROR =", error);

      if (error.response) {
        console.log("STATUS =", error.response.status);
        console.log("DATA =", error.response.data);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      alert("User Deleted");
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await changeRole(id, role);
      alert("Role Updated");
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Delete</th>
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
                <select
                  onChange={(e) =>
                    handleRoleChange(
                      user.id,
                      e.target.value
                    )
                  }
                >
                  <option>Select</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="STUDENT">STUDENT</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() =>
                    handleDelete(user.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;