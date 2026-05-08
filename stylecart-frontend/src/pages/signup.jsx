import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Signup
      await axios.post("http://localhost:5000/api/users/signup", { email, password });

      // 2️⃣ Auto-login after signup
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      alert(res.data.message);

      // Optional: save user info and redirect
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard"; // change to your route

    } catch (err) {
      alert(err.response ? err.response.data.message : "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup & Login</button>
      </form>
    </div>
  );
};

export default Signup;
