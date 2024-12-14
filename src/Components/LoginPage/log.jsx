import React from "react";

const LoginPage = ({ onLogin }) => {
  const loginAsRole = (role) => {
    onLogin(role);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => loginAsRole("CEO")}>Login as CEO</button>
      <button onClick={() => loginAsRole("Employee")}>Login as Employee</button>
      <button onClick={() => loginAsRole("Manager")}>Login as Manager</button>
    </div>
  );
};

export default LoginPage;
