import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(
          `https://payroll-ms-backend.vercel.app/api/leave/my/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setLeaves(res.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h3 className="text-2xl font-bold text-[#1F1C2C] mb-6 border-b pb-2">
        Manage Leaves
      </h3>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search Leaves"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
        />
        <Link
          to="/employeeDashboard/addLeaves"
          className="px-4 py-2 bg-[#1F1C2C] text-white rounded-md hover:bg-[#928DAB] transition"
        >
          + Add New Leave
        </Link>
      </div>

      <table className="min-w-full border border-[#928DAB]">
        <thead className="bg-[#1F1C2C] text-white">
          <tr>
            <th className="py-2 px-4 border border-[#928DAB]">S. No</th>
            <th className="py-2 px-4 border border-[#928DAB]">Leave Type</th>
            <th className="py-2 px-4 border border-[#928DAB]">From</th>
            <th className="py-2 px-4 border border-[#928DAB]">To</th>
            <th className="py-2 px-4 border border-[#928DAB]">Status</th>
            <th className="py-2 px-4 border border-[#928DAB]">Description</th>
          </tr>
        </thead>
        <tbody className="text-[#1F1C2C]">
          {leaves.length > 0 ? (
            leaves.map((leave, index) => (
              <tr
                key={leave._id}
                className="hover:bg-[#f1effa] transition-all duration-200"
              >
                <td className="py-2 px-4 border border-[#928DAB] text-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-[#928DAB] text-center">
                  {leave.leaveType}
                </td>
                <td className="py-2 px-4 border border-[#928DAB] text-center">
                  {new Date(leave.fromDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border border-[#928DAB] text-center">
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border border-[#928DAB] text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      leave.status === "pending"
                        ? "bg-yellow-500"
                        : leave.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="py-2 px-4 border border-[#928DAB]">
                  {leave.description || "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-4 text-center text-gray-500 border border-[#928DAB]"
              >
                No leave records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
