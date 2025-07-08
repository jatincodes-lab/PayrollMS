import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper"; // Assuming this function fetches departments
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    getDepartments();
  }, []);

  const handelChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/adminDashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#1F1C2C] p-8 rounded-xl shadow-md text-[#928DAB]">
      <h3 className="text-2xl font-bold text-white mb-6">Add Employee</h3>
      <form
        onSubmit={handelSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handelChange}
            placeholder="Enter full name"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handelChange}
            placeholder="Enter email"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label htmlFor="empId" className="block mb-1 font-medium">
            Employee ID
          </label>
          <input
            type="text"
            id="empId"
            name="empId"
            onChange={handelChange}
            placeholder="Enter employee ID"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* DOB */}
        <div>
          <label htmlFor="dob" className="block mb-1 font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            onChange={handelChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            onChange={handelChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block mb-1 font-medium">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handelChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label htmlFor="designation" className="block mb-1 font-medium">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            onChange={handelChange}
            placeholder="Enter designation"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block mb-1 font-medium">
            Department
          </label>
          <select
            name="department"
            onChange={handelChange}
            required
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value={""}>Select Department</option>
            {departments &&
              departments.length > 0 &&
              departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block mb-1 font-medium">
            Salary (₹)
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            onChange={handelChange}
            placeholder="Enter salary"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handelChange}
            id="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block mb-1 font-medium">
            Role
          </label>
          <select
            name="role"
            onChange={handelChange}
            id="role"
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handelChange}
            accept="image/*"
            className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#928DAB] file:text-[#1F1C2C] file:font-medium hover:file:bg-[#7c7a95]"
          />
        </div>
        {/* Submit Button */}
        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
