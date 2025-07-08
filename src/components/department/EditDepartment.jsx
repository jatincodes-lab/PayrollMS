import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { _id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/editDepartment/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/${_id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    <>
      {" "}
      {depLoading ? (
        <div>Loading .....</div>
      ) : (
        <div className="max-w-xl mx-auto bg-[#1F1C2C] p-8 rounded-xl shadow-md text-[#928DAB]">
          <h3 className="text-2xl font-bold text-white mb-6">
            Edit Department
          </h3>
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
                value={department.dep_name}
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
                value={department.description}
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
              Edit Department
            </button>
          </form>
        </div>
      )}{" "}
    </>
  );
};

export default EditDepartment;
