import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://payroll-ms-backend.vercel.app/api/employee/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            sno: index + 1,
            _id: emp._id,
            name: emp.userId.name,
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: emp.userId.profileImage,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filteredData);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#1F1C2C] mb-6 border-b pb-2">
        Manage Employees
      </h3>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search Employee"
          onChange={filterEmployees}
          className="w-full md:w-1/2 px-4 py-2 border border-[#928DAB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
        />
        <Link
          to="/adminDashboard/addEmployee"
          className="px-4 py-2 bg-[#1F1C2C] text-white rounded-md hover:bg-[#928DAB] transition"
        >
          + Add New Employee
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-[#1F1C2C]">
          <thead className="bg-[#1F1C2C] text-[white]">
            <tr>
              <th className="px-4 py-2 text-left">S. No</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">DOB</th>
              <th className="px-4 py-2 text-center ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp._id}
                className="hover:bg-[#F3F2F7] transition duration-200"
              >
                <td className="px-4 py-3">{emp.sno}</td>
                <td className="px-4 py-3">
                  <img
                    src={`https://payroll-ms-backend.vercel.app/uploads/${emp.profileImage}`}
                    alt="profile"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.dep_name}</td>
                <td className="px-4 py-3">
                  {new Date(emp.dob).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <EmployeeButtons _id={emp._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
