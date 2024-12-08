import React from "react";
import Sidebar from "./Components/Shared/Sidebar";
import Header from "./Components/Shared/Header";
import Dashboard from "./Components/Employee/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: "flex" }}>
        {/* Sidebar remains fixed */}
        <Sidebar />

        {/* Main panel for routes */}
        <div
          style={{
            marginLeft: "250px", // Sidebar width
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/attendance"
              element={<h2>Attendance Page Content</h2>}
            />
            <Route
              path="/shift-schedule"
              element={<h2>Shift Schedule Content</h2>}
            />
            <Route
              path="/leave-request"
              element={<h2>Leave Request Content</h2>}
            />
            <Route path="/reports" element={<h2>Reports Page Content</h2>} />
            <Route path="/inbox" element={<h2>Inbox Page Content</h2>} />
            <Route path="/settings" element={<h2>Settings Page Content</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
