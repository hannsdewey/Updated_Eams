import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Components/Shared/Sidebar";
import Header from "./Components/Shared/Header";
import LoginForm from "./Components/LoginPage/Login"; // Adjust the path if necessary

// Employee Components
import EmployeeDashboard from "./Components/Employee/dashboard";
import AttendancePage from "./Components/Employee/Attendance";
import InboxPage from "./Components/Employee/Inbox";
import LeaveRequest from "./Components/Employee/LeaveRequest";
import ShiftSchedule from "./Components/Employee/ShiftSchedule";
import EmployeeReport from "./Components/Employee/EmployeeReport";

// Manager Components
import Dashboard from "./Components/Manager/Dashboard";
import Attendance from "./Components/Manager/Attendance";
import Inbox from "./Components/Manager/Inbox";
import ManagerLeaveRequest from "./Components/Manager/ManagerLeaveRequest";
import Shiftschedule from "./Components/Manager/Shiftschedule";
import Report from "./Components/Manager/Report";

// CEO Components
import CEODashboard from "./Components/CEO/CEODashboard";
import CEOReports from "./Components/CEO/CEOReports";
import CEOManageUser from "./Components/CEO/CEOManageUser";
import CEOManageTeam from "./Components/CEO/CEOManageTeam";
import CEOShiftSchedule from "./Components/CEO/CEOShiftSchedule";
import CEOLeaveManagement from "./Components/CEO/CEOLeaveManagement";

function App() {
  const [role, setRole] = useState(null); // Track user role after login

  // Role-specific Routes
  const renderRoutes = () => {
    if (role === "Employee") {
      return (
        <>
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
          <Route path="/reports" element={<EmployeeReport />} />
          <Route path="/shift-schedule" element={<ShiftSchedule />} />
        </>
      );
    } else if (role === "Manager") {
      return (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/leave-request" element={<ManagerLeaveRequest />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/shift-schedule" element={<Shiftschedule />} />
        </>
      );
    } else if (role === "CEO") {
      return (
        <>
          <Route path="/ceo/dashboard" element={<CEODashboard />} />
          <Route path="/ceo/reports" element={<CEOReports />} />
          <Route path="/ceo/manage-user" element={<CEOManageUser />} />
          <Route path="/ceo/manage-team" element={<CEOManageTeam />} />
          <Route path="/ceo/shift-schedule" element={<CEOShiftSchedule />} />
          <Route
            path="/ceo/leave-management"
            element={<CEOLeaveManagement />}
          />
        </>
      );
    }
    return <Route path="*" element={<Navigate to="/" />} />;
  };

  return (
    <Router>
      {!role ? (
        // Render Login Page if no role is set
        <LoginForm setRole={setRole} />
      ) : (
        <>
          <Header />
          <div style={{ display: "flex" }}>
            <Sidebar role={role} />
            <div style={{ marginLeft: "200px", flexGrow: 1, padding: "20px" }}>
              <Routes>
                {renderRoutes()}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
