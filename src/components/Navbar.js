// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    window.location.reload(); // Reload to reset the app state
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Title */}
          <h1 className="text-xl font-bold tracking-wide">Chat Application</h1>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
