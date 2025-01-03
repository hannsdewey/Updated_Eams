import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const users = [
    {
      username: "Jazz22",
      password: "manager123",
      role: "Manager",
      route: "/manager",
    },
    { username: "eugen2", password: "ceo123", role: "CEO", route: "/ceo" },
    {
      username: "hanndewey",
      password: "employee123",
      role: "Employee",
      route: "/employee",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setRole(foundUser.role);
      setErrorMessage("");
      navigate(foundUser.route); // Navigate to appropriate dashboard
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
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
        </div>
      </div>
    </div>
  );
}

export default Login;
