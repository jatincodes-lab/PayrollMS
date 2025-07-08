import React, { useState } from "react";
import axios from "axios";

const Setting = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage({
        type: "error",
        text: "New and confirm passwords do not match.",
      });
    }

    try {
      const res = await axios.put(
        "https://payroll-ms-backend.vercel.app/api/employee/change-password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setMessage({ type: "success", text: res.data.message });
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[#1F1C2C] text-[#928DAB] p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6 border-b pb-2">
        Change Password
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
            placeholder="Enter old password"
            required
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-[#928DAB] bg-[#2C293A] text-white placeholder-[#bcb9d0] focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
            placeholder="Confirm new password"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#928DAB] text-[#1F1C2C] px-6 py-2 rounded-md font-semibold hover:bg-[#7c7a95] transition"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
