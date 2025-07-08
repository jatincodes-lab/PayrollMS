import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://payroll-ms-backend.vercel.app/api/auth/login",
        { email, password }
      );
      if (response.data.sucess) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        if (response.data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/employeeDashboard");
        }
        setError("");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      console.error("Login error:", err);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-300 to-gray-600 relative">
      {/* Background Title */}
      <div className="absolute top-10 w-full text-center z-0">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
          Payroll Management System
        </h1>
      </div>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center z-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
          <form className="space-y-5" onSubmit={handelSubmit}>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              Login
            </h3>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                placeholder="Enter Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2 text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
