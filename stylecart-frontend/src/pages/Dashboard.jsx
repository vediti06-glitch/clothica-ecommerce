import { useEffect } from "react";

const Dashboard = () => {

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
