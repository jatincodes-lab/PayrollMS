import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S no",
    selector: (row) => row.sno,
    width: "10%",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "10%",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "15%",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "15%",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "18%",
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => row.actions,
    center: true,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      "https://payroll-ms-backend.vercel.app/api/department/getAll",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
  return departments;
};

// employees for salary form
export const getEmployees = async (_id) => {
  let employees;
  try {
    const response = await axios.get(
      `https://payroll-ms-backend.vercel.app/api/employee/department/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
        onClick={() => navigate(`/adminDashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
        onClick={() => navigate(`/adminDashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
        onClick={() => navigate(`/adminDashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
        onClick={() => navigate(`/adminDashboard/employees/leaves/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};
