import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#1F1C2C] text-[#928DAB] px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-semibold tracking-wide">{user?.role} Panel</h1>

      <div className="flex items-center gap-4">
        <p className="text-sm">
          Welcome, <span className="text-white font-medium">{user?.name}</span>
        </p>
        <button
          onClick={logout}
          className="bg-[#928DAB] text-[#1F1C2C] px-3 py-1 rounded-md font-medium hover:bg-[#7c7a95] transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
