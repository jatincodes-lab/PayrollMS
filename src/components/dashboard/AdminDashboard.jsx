import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBill,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const navItems = [
  {
    to: "/adminDashboard",
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    end: true,
  },
  { to: "/adminDashboard/employees", label: "Employees", icon: <FaUsers /> },
  {
    to: "/adminDashboard/departments",
    label: "Departments",
    icon: <FaBuilding />,
  },
  { to: "/adminDashboard/leaves", label: "Leaves", icon: <FaCalendar /> },
  { to: "/adminDashboard/salary/add", label: "Salary", icon: <FaMoneyBill /> },
  { to: "/adminDashboard/settings", label: "Settings", icon: <FaCogs /> },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-64 bg-[#1F1C2C] text-[#928DAB] p-6">
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-[#928DAB] pb-2">
        Admin Dashboard
      </h3>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.end} // ✅ Apply end only when specified
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 
      ${
        isActive
          ? "bg-[#928DAB] text-[#1F1C2C]"
          : "hover:bg-[#928DAB]/20 hover:text-white"
      }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
