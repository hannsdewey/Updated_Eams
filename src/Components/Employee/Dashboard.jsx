import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import ManagerDashboard from "./Components/Manager/Dashboard";
import EmployeeDashboard from "./Components/Employee/Dashboard";
import LeaveRequest from "./Components/Manager/LeaveRequest";

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Manager Dashboard Route */}
        <Route path="/manager" element={<ManagerDashboard />} />

        {/* CEO Dashboard Route */}
        <Route path="/ceo" element={<LeaveRequest />} />

        {/* Employee Dashboard Route */}
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* Redirect to Login if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
