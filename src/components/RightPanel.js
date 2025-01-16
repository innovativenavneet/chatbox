import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/apiService"; // Assuming this function fetches the list of users

const RightPanel = () => {
  const [users, setUsers] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data); // Assuming the response contains a list of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-64 bg-gray-50 p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <ul className="space-y-2">
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="text-gray-600">
              {user.username} {/* Assuming `username` is available in user object */}
            </li>
          ))
        ) : (
          <li className="text-gray-600">No active users</li>
        )}
      </ul>
    </div>
  );
};

export default RightPanel;
