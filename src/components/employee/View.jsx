import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { _id } = useParams(); // employee _id from route
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://payroll-ms-backend.vercel.app/api/employee/get/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      }
    };

    fetchEmployee();
  }, [_id]);

  if (!employee)
    return <div className="text-center text-gray-400 mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-[#1F1C2C]">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 text-[#1F1C2C] border-b pb-2">
        Employee Profile Information
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div>
          <img
            src={`https://payroll-ms-backend.vercel.app/uploads/${employee.userId.profileImage}`}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-lg border"
          />
        </div>

        {/* Employee Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-[#1F1C2C]">
            {employee.userId.name}
          </h2>
          <p className="text-[#5A5560] mb-1">
            <strong>Email:</strong> {employee.userId.email}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Employee ID:</strong> {employee.empId}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>DOB:</strong> {new Date(employee.dob).toLocaleDateString()}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Gender:</strong> {employee.gender}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Marital Status:</strong> {employee.maritalStatus}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Designation:</strong> {employee.designation}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Department:</strong> {employee.department.dep_name}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Salary:</strong> ₹{employee.salary}
          </p>
          <p className="text-[#5A5560] mb-1">
            <strong>Role:</strong> {employee.userId.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default View;
