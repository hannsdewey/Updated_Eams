import React, { useState } from "react";
<<<<<<< HEAD
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./App.css";

function LoginForm({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded credentials (in a real app, this should come from an API or database)
  const users = [
    { username: "Jazz22", password: "manager123", role: "Manager" },
    { username: "eugen2", password: "ceo123", role: "CEO" },
    { username: "hanndewey", password: "employee123", role: "Employee" },
  ];

  const handleLogin = (event) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setRole(foundUser.role); // Set the role in the parent component (App.js)
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password.");
=======
import "./App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication logic
    if (email === "manager@company.com" && password === "password") {
      navigate("/manager"); // Navigate to Manager's dashboard
    } else if (email === "ceo@company.com" && password === "password") {
      navigate("/ceo"); // Navigate to CEO's dashboard
    } else if (email === "employee@company.com" && password === "password") {
      navigate("/employee"); // Navigate to Employee's dashboard
    } else {
      alert("Invalid email or password");
>>>>>>> 3575f4e8bd0d3f8e64dad875a22ff91a685930c3
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-container">
      <div className="login-form-container">
        <div className="form-card">
          <h1 className="form-title">Welcome Back</h1>
          <p className="form-subtitle">Sign in to your account</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input-field"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="options">
              <label className="remember-option">
                <input type="checkbox" className="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="submit-btn">
              Sign in
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
=======
    <section className="bgform">
      <div className="flex">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="head">Sign in to your account</h1>
            <p>Please enter your details.</p>
            <form className="loginform" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="emailholder"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="passwordplaceholder"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="align">
                <div>
                  <input type="checkbox" id="remember" className="remembercheckbox" />
                </div>
                <div>
                  <label htmlFor="remember" className="remember">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="forgotpass">
                    Forgot password?
                  </a>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Sign in
              </button>
            </form>
          </div>
>>>>>>> 3575f4e8bd0d3f8e64dad875a22ff91a685930c3
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
