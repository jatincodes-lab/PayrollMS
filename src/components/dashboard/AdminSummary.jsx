import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBill,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-[#1F1C2C]">Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
        />
        <SummaryCard icon={<FaMoneyBill />} text="Monthly Pay" number={2000} />
      </div>

      <div className="mt-12">
        <div className="text-center text-2xl font-bold text-[#1F1C2C]">
          Leave Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Applied Leaves" number={5} />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Approved Leaves"
            number={2}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Rejected Leaves"
            number={1}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Pending Leaves"
            number={2}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
