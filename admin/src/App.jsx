import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdmin } from "./context/AdminContext";

import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddItem from "./pages/AddItem";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";

function App() {
  const { token } = useAdmin();

  // 🔐 Not logged in
  if (!token) {
    return (
      <>
        <Login />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  // ✅ Admin layout
  return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />

    {/* 👇 THIS is the main content wrapper */}
    <div style={{ flex: 1, marginLeft: "240px" }}>
      <Navbar />

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/list" element={<ListItems />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>

    <ToastContainer />
  </div>
);
}

export default App;