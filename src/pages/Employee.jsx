import React from 'react'
import EmployeeSideBar from '../components/EmployeeDashboard/EmployeeSideBar';
import { Outlet } from "react-router-dom"
import Navbar from "../components/dashboard/Navbar"

const Employee = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-[#1F1C2C] text-white">
        <EmployeeSideBar />
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

export default Employee
