import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // make sure your CSS is linked

const Login = () => {
  const { login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        localStorage.setItem("admin", JSON.stringify(data.user));
        toast.success(`Welcome back, ${data.user.username}!`);
        navigate("/add-product");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* Background Blobs */}
      <div className="login-bg">
        <div className="login-blob login-blob-1"></div>
        <div className="login-blob login-blob-2"></div>
        <div className="login-blob login-blob-3"></div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">C</div>
          <div>
            <div className="login-logo-name">Clothica Admin</div>
            <div className="login-logo-tag">Dashboard</div>
          </div>
        </div>

        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Please login to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="login-field">
            <label className="login-label">Username</label>
            <div className="login-input-wrap">
              <input
                type="text"
                className="login-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <input
                type={showPwd ? "text" : "password"}
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="login-spinner"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;