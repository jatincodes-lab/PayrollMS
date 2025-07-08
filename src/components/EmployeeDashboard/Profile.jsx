import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://payroll-ms-backend.vercel.app/api/employee/get/${user?._id}`,
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

    if (user?._id) fetchEmployee();
  }, [user]);

  if (!employee)
    return <div className="text-center text-[#928DAB] mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#1F1C2C] shadow-lg rounded-lg text-[#928DAB]">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6 text-white border-b border-[#928DAB] pb-2">
        Employee Profile
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Image */}
        <div>
          <img
            src={`https://payroll-ms-backend.vercel.app/uploads/${employee.image}`}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-lg border border-[#928DAB]"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 bg-[#2C293A] p-5 rounded-md space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {employee.userId?.name}
          </h2>
          <p>
            <span className="font-semibold text-white">Email:</span>{" "}
            {employee.userId?.email}
          </p>
          <p>
            <span className="font-semibold text-white">Employee ID:</span>{" "}
            {employee.empId}
          </p>
          <p>
            <span className="font-semibold text-white">DOB:</span>{" "}
            {new Date(employee.dob).toDateString()}
          </p>
          <p>
            <span className="font-semibold text-white">Gender:</span>{" "}
            {employee.gender}
          </p>
          <p>
            <span className="font-semibold text-white">Marital Status:</span>{" "}
            {employee.maritalStatus}
          </p>
          <p>
            <span className="font-semibold text-white">Designation:</span>{" "}
            {employee.designation}
          </p>
          <p>
            <span className="font-semibold text-white">Department:</span>{" "}
            {employee.department?.dep_name}
          </p>
          <p>
            <span className="font-semibold text-white">Salary:</span> ₹
            {employee.salary}
          </p>
          <p>
            <span className="font-semibold text-white">Role:</span>{" "}
            {employee.userId?.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
