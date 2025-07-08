import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://payroll-ms-backend.vercel.app/api/leave/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert("Leave request submitted!");
        navigate("/employeeDashboard");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to submit leave");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-[#1F1C2C] rounded-xl shadow-md text-[#928DAB]">
      <h3 className="text-2xl font-bold text-white mb-6">Request Leave</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Leave Type - Full Width */}
        <div className="md:col-span-2">
          <label htmlFor="leaveType" className="block mb-1 font-medium">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select Leave Type</option>
            <option value="sick">Sick Leave</option>
            <option value="annual">Annual Leave</option>
            <option value="casual">Casual Leave</option>
          </select>
        </div>

        {/* From Date - Half Width */}
        <div>
          <label htmlFor="fromDate" className="block mb-1 font-medium">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* To Date - Half Width */}
        <div>
          <label htmlFor="toDate" className="block mb-1 font-medium">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Description - Full Width */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Reason for leave..."
            required
            className="w-full px-4 py-2 h-32 resize-none rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
