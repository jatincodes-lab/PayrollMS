import { useNavigate } from "react-router-dom";

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handelView = () => {
    navigate(`/adminDashboard/leaveS/${id}`);
  };

  return (
    <button
      onClick={handelView}
      className="bg-[#928DAB] text-[#1F1C2C] px-4 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
    >
      View
    </button>
  );
};
