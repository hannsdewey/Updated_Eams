import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Components/Shared/Sidebar";
import Header from "./Components/Shared/Header";
import Dashboard from "./Components/Manager/Dashboard";
import Attendance from "./Components/Manager/Attendance";
import LeaveRequest from "./Components/Manager/LeaveRequest";
import Inbox from "./Components/Manager/Inbox";
import Report from "./Components/Manager/Report";
import Settings from "./Components/Manager/Settings";
import Shiftschedule from "./Components/Manager/Shiftschedule";



function App() {
  return (
    <Router>
      <Header />
      
      <div style={{ display: "flex" }}>
        <Sidebar />

        {/* Main panel for routes */}
        <div
          style={{
            marginLeft: "200px", // Adjust based on Sidebar width
            flexGrow: 1, // Allows main panel to occupy remaining space
            padding: "20px", // Adds spacing around main content
          }}
        >
          <Routes>
            {/* Redirect root path to Dashboard */}
            
            
            {/* Define application routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/shift-schedule" element={<Shiftschedule />} />
            <Route path="/leave-request" element={<LeaveRequest />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
