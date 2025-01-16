import React, { useState } from "react";
import { FaBars, FaTachometerAlt, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

const LeftMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-100 h-full p-4 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 shadow-lg`}
    >
      {/* Toggle Button */}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaBars />
      </button>

      {/* Menu Items */}
      <ul className="space-y-2">
        <li
          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          title="Dashboard"
        >
          <FaTachometerAlt className="text-lg" />
          {!isCollapsed && <span className="ml-4">Dashboard</span>}
        </li>
        <li
          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          title="Settings"
        >
          <FaCog className="text-lg" />
          {!isCollapsed && <span className="ml-4">Settings</span>}
        </li>
        <li
          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          title="Profile"
        >
          <FaUser className="text-lg" />
          {!isCollapsed && <span className="ml-4">Profile</span>}
        </li>
        <li
          className="flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer"
          title="Logout"
        >
          <FaSignOutAlt className="text-lg" />
          {!isCollapsed && <span className="ml-4">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default LeftMenu;
