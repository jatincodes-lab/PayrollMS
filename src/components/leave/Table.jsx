import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import DataTable from "react-data-table-component";
import { LeaveButtons } from "../../utils/LeaveHelper.jsx";

const Table = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          "https://payroll-ms-backend.vercel.app/api/leave/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.leaves.map((lev, index) => ({
            sno: index + 1,
            _id: lev._id,
            leaveType: lev.leaveType,
            name: lev.userId?.name || "-",
            days:
              (new Date(lev.toDate) - new Date(lev.fromDate)) /
                (1000 * 60 * 60 * 24) +
              1,
            description: lev.description || "-",
            status: lev.status,
            action: <LeaveButtons id={lev._id} />,
          }));
          setLeaves(data);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, []);

  // Define DataTable columns
  const columns = [
    { name: "S. No", selector: (row) => row.sno, width: "80px" },
    { name: "Employee", selector: (row) => row.name, sortable: true },
    { name: "Leave Type", selector: (row) => row.leaveType, sortable: true },
    { name: "Days", selector: (row) => row.days },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            row.status === "pending"
              ? "bg-yellow-500"
              : row.status === "approved"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Description", selector: (row) => row.description, wrap: true },
    { name: "Action", selector: (row) => row.action },
  ];

  // Filtered leaves for search and status
  const filteredLeaves = leaves.filter((leave) => {
    const searchMatch =
      leave.name.toLowerCase().includes(filterText.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(filterText.toLowerCase());
    const statusMatch = statusFilter ? leave.status === statusFilter : true;
    return searchMatch && statusMatch;
  });

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#1F1C2C] mb-6 border-b pb-2">
        Manage Leaves
      </h3>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search Leave / Employee"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-[#928DAB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {leaves.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">
          No leave records found.
        </p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#1F1C2C",
                color: "#ffffff",
                fontWeight: "600",
              },
            },
            rows: {
              style: {
                fontSize: "14px",
                color: "#1F1C2C",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Table;
