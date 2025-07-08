import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCogs,
  FaMoneyBill,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const EmployeeSideBar = () => {
  const { user } = useAuth(); // ✅ moved inside the component

  const navItems = [
    {
      to: "/employeeDashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      to: "/employeeDashboard/profile",
      label: "My Profile",
      icon: <FaUsers />,
    },
    {
      to: `/employeeDashboard/leaves/${user?._id}`,
      label: "Leaves",
      icon: <FaBuilding />,
    },
    {
      to: `/employeeDashboard/salary/${user?._id}`,
      label: "Salary",
      icon: <FaMoneyBill />,
    },
    {
      to: "/employeeDashboard/settings",
      label: "Settings",
      icon: <FaCogs />,
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-[#1F1C2C] text-[#928DAB] p-6">
      <h3 className="text-xl font-semibold text-white mb-6 border-b border-[#928DAB] pb-2">
        Employee Dashboard
      </h3>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.end}
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

export default EmployeeSideBar;
