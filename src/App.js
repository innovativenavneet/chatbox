import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LeftMenu from "./components/LeftMenu";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";
import Footer from "./components/Footer";
import Login from "./components/Login"; 
import "./index.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(true); // Skip auth logic for now
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected userId

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId); // Set the selected user when clicked in RightPanel
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Render Navbar */}
        <Navbar />

        <Routes>
          {/* Authenticated layout */}
          <Route
            path="/"
            element={
              authenticated ? (
                <div className="flex flex-1 flex-col mt-16">
                  {/* Content outside the Navbar */}
                  <div className="flex flex-1">
                    {/* Left Menu */}
                    <aside className="w-64 bg-white shadow-md hidden md:block">
                      <LeftMenu />
                    </aside>

                    {/* Main Content (Chat Room) */}
                    <main className="flex-1 p-4 bg-gray-50">
                      <MainContent selectedUserId={selectedUserId} />
                    </main>

                    {/* Right Panel */}
                    <aside className="w-64 bg-white shadow-md hidden lg:block">
                      <RightPanel onUserSelect={handleUserSelect} />
                    </aside>
                  </div>

                  {/* Footer */}
                  <Footer />
                </div>
              ) : (
                <Navigate to="/login" replace /> // Redirect to login if not authenticated
              )
            }
          />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
