import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewSalary = () => {
  const { _id } = useParams(); // employee _id
  const [salaries, setSalaries] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/salary/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          );
        if (res.data.success) {
          setSalaries(res.data.salaries);
          setEmployeeName(res.data.employeeName);
        }
      } catch (error) {
        console.error("Failed to fetch salary:", error);
      }
    };

    fetchSalary();
  }, [_id]);

  return (
    <div className="max-w-5xl mx-auto bg-[#1F1C2C] p-8 mt-10 rounded-xl shadow-md text-[#928DAB]">
      <h3 className="text-2xl font-bold text-white mb-6 border-b pb-2">
        Salary History
      </h3>

      {employeeName && (
        <p className="text-lg text-[#bcb9d0] mb-4">
          <strong>Employee:</strong> {employeeName}
        </p>
      )}

      {salaries.length === 0 ? (
        <p className="text-[#bcb9d0]">No salary records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#2C293A] text-white">
                <th className="p-3 text-left border-b border-[#928DAB]">
                  Pay Date
                </th>
                <th className="p-3 text-left border-b border-[#928DAB]">
                  Basic Salary
                </th>
                <th className="p-3 text-left border-b border-[#928DAB]">
                  Allowance
                </th>
                <th className="p-3 text-left border-b border-[#928DAB]">
                  Deduction
                </th>
                <th className="p-3 text-left border-b border-[#928DAB]">
                  Net Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((sal, index) => (
                <tr key={index} className="hover:bg-[#2C293A]">
                  <td className="p-3 border-b border-[#928DAB]">
                    {new Date(sal.payDate).toDateString()}
                  </td>
                  <td className="p-3 border-b border-[#928DAB]">
                    ₹{sal.basicSalary}
                  </td>
                  <td className="p-3 border-b border-[#928DAB]">
                    ₹{sal.allowance}
                  </td>
                  <td className="p-3 border-b border-[#928DAB]">
                    ₹{sal.deduction}
                  </td>
                  <td className="p-3 border-b border-[#928DAB] font-semibold">
                    ₹{sal.netSalary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewSalary;
