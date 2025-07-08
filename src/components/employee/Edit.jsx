import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `https://payroll-ms-backend.vercel.app/api/employee/get/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setEmployee(res.data.employee);
          setFormData({
            name: res.data.employee.userId.name,
            email: res.data.employee.userId.email,
            empId: res.data.employee.empId,
            dob: res.data.employee.dob.split("T")[0],
            gender: res.data.employee.gender,
            maritalStatus: res.data.employee.maritalStatus,
            designation: res.data.employee.designation,
            department: res.data.employee.department._id,
            salary: res.data.employee.salary,
            role: res.data.employee.userId.role,
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "https://payroll-ms-backend.vercel.app/api/department/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) setDepartments(res.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchEmployee();
    fetchDepartments();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://payroll-ms-backend.vercel.app/api/employee/update/${_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        navigate("/adminDashboard/employees");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Try again.");
    }
  };

  if (!employee)
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-[#1F1C2C] p-8 rounded-xl shadow-md text-[#928DAB]">
      <h3 className="text-2xl font-bold text-white mb-6">Edit Employee</h3>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Employee ID</label>
          <input
            name="empId"
            value={formData.empId || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">DOB</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Designation</label>
          <input
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Department</label>
          <select
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Salary (₹)</label>
          <input
            name="salary"
            type="number"
            value={formData.salary || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
