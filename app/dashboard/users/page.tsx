"use client";

import { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export default function UserInfo() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Function to fetch users
  async function getAllUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalUsers(data.users.length); // Set total users count
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []); // Empty array means it will run once when the component mounts

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 mb-4 sm:mb-8 text-center">
        User Management
      </h1>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Total Users: {totalUsers}
        </h2>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">
                Name
              </th>
              <th className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">
                Email
              </th>
              <th className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">
                Phone Number
              </th>
              <th className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">
                Role
              </th>
              <th className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 truncate">
                  {user.name}
                </td>
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 truncate">
                  {user.email}
                </td>
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 truncate">
                  {user.phoneNumber}
                </td>
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800 truncate">
                  {user.role}
                </td>
                <td className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-800">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function handleDelete(userId: string) {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted successfully");
        // After deletion, refetch the users to update the list
        getAllUsers();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}