import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "sign up") {
        // SIGNUP API
        const res = await await axios.post("http://localhost:5000/api/auth/signup", {
            name,
            email,
            password,
          }
        );

        alert(res.data.message);
        setCurrentState("login");
      } else {
        // LOGIN API
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
          }
        );
const userData = res.data.user;

setUser(userData);
localStorage.setItem("user", JSON.stringify(userData));
localStorage.setItem("user_id", userData.id);

const redirectPath = location.state?.from || "/";
navigate(redirectPath);

      }
    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          {currentState === "sign up" ? "Create an Account" : "Welcome Back"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {currentState === "sign up" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {currentState === "sign up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          {currentState === "sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("login")}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setCurrentState("sign up")}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
