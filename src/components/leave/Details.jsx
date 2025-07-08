import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const [leaves, setLeaves] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeaves(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeave(); // Call the async function
  }, [id]);

  if (!leaves)
        return <p className="text-center text-gray-500">No data available</p>;
    
    const changeStatus = async (leaveId, newStatus) => {
        try {
          const response = await axios.put(
            `http://localhost:3000/api/leave/${leaveId}`,
            { status: newStatus },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

            if (response.data.success) {
                setLeaves(response.data.leave);
                navigate("/adminDashboard/leaves");
          }
        } catch (error) {
          console.error("Error fetching leaves:", error);
        }
    }

  const { userId, leaveType, fromDate, toDate, description, status } = leaves;
  const days =
    (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl mx-auto mt-10 border border-gray-200">
      {/* Employee Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={`http://localhost:3000/uploads/${userId?.profileImage}`}
          alt="Employee"
          className="w-32 h-32 object-cover rounded-full border-2 border-[#1F1C2C]"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#1F1C2C] mb-2">
            {userId?.name || "Unknown Employee"}
          </h2>
          <p className="text-gray-700">Email: {userId?.email || "-"}</p>
        </div>
      </div>

      {/* Leave Info */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold text-[#1F1C2C] mb-3">
          Leave Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <p>
            <strong>Leave Type:</strong> {leaveType}
          </p>
          <p>
            <strong>{status === "pending" ? "Action:" : "Status:"}</strong>{" "}
            {status === "pending" ? (
              <span>
                <button
                  onClick={() => {
                    changeStatus(leaves._id, "approved");
                  }}
                  className="bg-[#928DAB] text-[#1F1C2C] px-4 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition mr-2"
                >
                  Approved
                </button>
                <button
                  onClick={() => {
                    changeStatus(leaves._id, "rejected");
                  }}
                  className="bg-[#928DAB] text-[#1F1C2C] px-4 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition mr-2"
                >
                  Rejected
                </button>
              </span>
            ) : (
              <span
                className={`px-2 py-1 rounded-full text-white text-xs ${
                  status === "pending"
                    ? "bg-yellow-500"
                    : status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {status}
              </span>
            )}
          </p>
          <p>
            <strong>From:</strong> {new Date(fromDate).toLocaleDateString()}
          </p>
          <p>
            <strong>To:</strong> {new Date(toDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Days:</strong> {days}
          </p>
          <p className="md:col-span-2">
            <strong>Description:</strong> {description || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
