import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/department/add", department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data.success) { 
        navigate("/adminDashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-[#1F1C2C] p-8 rounded-xl shadow-md text-[#928DAB]">
      <h3 className="text-2xl font-bold text-white mb-6">Add Department</h3>
      <form onSubmit={handelSubmit}>
        {/* Department Name */}
        <div className="mb-4">
          <label htmlFor="dep_name" className="block mb-1 font-medium">
            Department Name
          </label>
          <input
            type="text"
            id="dep_name"
            onChange={handelChange}
            name="dep_name"
            placeholder="Enter Department Name"
            className="w-full px-4 py-2 rounded-md bg-[#2C293A] text-white border border-[#928DAB] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            onChange={handelChange}
            name="description"
            placeholder="Enter Department Description"
            rows="4"
            className="w-full px-4 py-2 rounded-md bg-[#2C293A] text-white border border-[#928DAB] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
