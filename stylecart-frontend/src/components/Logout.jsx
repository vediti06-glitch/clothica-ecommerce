const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you are using JWT
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;