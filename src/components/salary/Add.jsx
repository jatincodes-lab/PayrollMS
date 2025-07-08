import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    empId: null,
    basicSalary: 0,
    allowance: 0,
    deduction: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // const fetchEmployee = async () => {
    //   try {
    //     const res = await axios.get(
    //       `https://payroll-ms-backend.vercel.app/api/employee/get/${_id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     if (res.data.success) {
    //       setEmployee(res.data.employee);
    //       setFormData({
    //         name: res.data.employee.userId.name,
    //         email: res.data.employee.userId.email,
    //         empId: res.data.employee.empId,
    //         dob: res.data.employee.dob.split("T")[0],
    //         gender: res.data.employee.gender,
    //         maritalStatus: res.data.employee.maritalStatus,
    //         designation: res.data.employee.designation,
    //         department: res.data.employee.department._id,
    //         salary: res.data.employee.salary,
    //         role: res.data.employee.userId.role,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error fetching employee:", error);
    //   }
    // };

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

    // fetchEmployee();
    fetchDepartments();
  }, [_id]);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://payroll-ms-backend.vercel.app/api/salary/add`,
        employee,
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
      <h3 className="text-2xl font-bold text-white mb-6">Add Salary</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <select
            name="department"
            onChange={handleDepartment}
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
          <label className="block mb-1 font-medium">Employee</label>
          <select
            name="empId"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          >
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId?.name} ({emp.empId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            placeholder="Enter Basic Salary"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Allowance</label>
          <input
            name="allowance"
            placeholder="Enter Allowance"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Deduction</label>
          <input
            type="number"
            name="deduction"
            placeholder="Enter Deduction"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pay Date</label>
          <input
            placeholder="Enter Pay Date"
            type="date"
            name="payDate"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
          />
        </div>

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
          >
            + Add Salary
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
