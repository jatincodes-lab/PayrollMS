import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S no",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    sortable: true,
    selector: (row) => row.dep_name,
  },
  {
    name: "Actions",
    cell: (row) => row.actions,
    center: true,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handelDelete = async (_id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete(_id);
        }
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-2 rounded font-semibold hover:bg-[#7c7a95] transition"
        onClick={() => navigate(`/adminDashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="bg-[#928DAB] text-[#1F1C2C] px-4 py-2 rounded font-semibold hover:bg-[#7c7a95] transition"
        onClick={() => handelDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
