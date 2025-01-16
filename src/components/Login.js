import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState(""); // Use email instead of username
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    if (!email || !password || (isSignUp && !confirmPassword)) {
      alert("All fields are required.");
      return false;
    }
    if (isSignUp && password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/chat/login/",
        { email, password }, // Send email and password as JSON
        { headers: { "Content-Type": "application/json" } } // Ensure content-type is JSON
      );

      localStorage.setItem("token", response.data.token);
      setAuthenticated(true);
      alert("Login successful!");
      navigate("/"); // Navigate to the main application layout
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Error during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/chat/signup/",
        { email, password }, // Send email and password as JSON
        { headers: { "Content-Type": "application/json" } } // Ensure content-type is JSON
      );

      if (response.status === 200) {
        alert("Sign up successful! Please log in.");
        setIsSignUp(false);
        navigate("/login");
      }
    } catch (error) {
      alert("Error during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {/* Input for Email instead of Username */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        
        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Show confirm password only in sign-up mode */}
        {isSignUp && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
        )}

        {/* Submit Button */}
        <button
          onClick={isSignUp ? handleSignUp : handleLogin}
          disabled={loading}
          className={`w-full py-3 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-lg`}
        >
          {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          {isSignUp ? "Already have an account? " : "New user? "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
