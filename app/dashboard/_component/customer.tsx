"use client";

import { useState, useEffect } from "react";
export default function Customers() {

  const [totalUsers, setTotalUsers] = useState<number>(0);

  // Function to fetch users
  async function getAllUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data.users)) {
        // setUsers(data.users);
        setTotalUsers(data.users.length);  
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []); 

  return (
    <div className="text-3xl font-bold text-green-600">
    {totalUsers}
    </div>
  );
}
  