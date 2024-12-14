import React, { useState } from "react";
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
    }
  };

  return (
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
        </div>
      </div>
    </section>
  );
}

export default Login;
