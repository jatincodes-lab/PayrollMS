import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import AdminDashboard from "../components/dashboard/AdminDashboard.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";


export default function Admin() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-[#1F1C2C] text-white">
        <AdminDashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ">
        <Navbar /> {/* Navbar appears at top of content area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
