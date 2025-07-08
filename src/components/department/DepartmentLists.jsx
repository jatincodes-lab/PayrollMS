import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentLists = () => {
const [rawDepartments, setRawDepartments] = useState([]);
const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

    const onDepartmentDelete = (_id) => {
      setRawDepartments((prev) => prev.filter((dep) => dep._id !== _id));
      setFilteredDepartments((prev) => prev.filter((dep) => dep._id !== _id));
    };
  

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setRawDepartments(response.data.departments);
          setFilteredDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const data = filteredDepartments.map((dep, index) => ({
    sno: index + 1,
    dep_name: dep.dep_name,
    actions: (
      <DepartmentButtons
        _id={dep._id}
        onDepartmentDelete={onDepartmentDelete}
      />
    ),
  }));

  const filterDepartments = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = rawDepartments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredDepartments(filteredData);
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-[#1F1C2C] mb-6 border-b pb-2">
            Manage Department
          </h3>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search Department"
              onChange={filterDepartments}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
            />
            <Link
              to="/adminDashboard/addDepartment"
              className="px-4 py-2 bg-[#1F1C2C] text-white rounded-md hover:bg-[#928DAB] transition"
            >
              + Add New Department
            </Link>
          </div>

          <div className="rounded-md overflow-hidden border border-gray-200">
            <DataTable
              columns={columns}
              data={data}
                pagination
              highlightOnHover
              responsive
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#1F1C2C",
                    color: "#ffffff",
                    fontWeight: "bold",
                  },
                },
                rows: {
                  style: {
                    fontSize: "14px",
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentLists;
