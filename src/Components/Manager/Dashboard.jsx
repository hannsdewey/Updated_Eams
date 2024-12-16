import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Clock In");
  
  // State to store data from the API
  const [dashboardData, setDashboardData] = useState({
    totalTeamEmployees: 0,
    activeShift: 0,
    presentEmployeesToday: 0,
    pendingLeaveRequests: 0,
  });

  // Fetch data from backend API
  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")  // Change the URL to your backend
      .then((response) => {
        setDashboardData(response.data); // Set the data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the dashboard data!", error);
      });

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  // Toggle clock status when clicked
  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "Clock In" ? "Clock Out" : "Clock In"));
  };

  return (
    <div
      style={{
        marginLeft: "0",
        marginTop: "1rem", // Sidebar width
        padding: "20px",
        width: "100%",
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section: Greeting */}
          <div>
            <h4 style={{ margin: 0 }}>Hello, John Doe</h4>
            <p style={{ fontSize: "14px", color: "gray", marginTop: "5px" }}>
              Welcome back to the Raddacon Call Center
            </p>
          </div>

          {/* Right Section: Clock and Clock In/Out */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {/* Time Section */}
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {formattedTime}
              </div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {formattedDate}
              </div>
            </div>

            {/* Clock In/Out Status */}
            <div
              onClick={toggleStatus} // Toggle status on click
              style={{
                padding: "8px 16px",
                backgroundColor: status === "Clock In" ? "#4caf50" : "#f44336",
                color: "white",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "100px",
                cursor: "pointer", // Makes it appear clickable
              }}
            >
              {status}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Team Employees Section */}
        <div
          style={{
            width: "20%",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            border: "2px solid #1D4ED8", // Blue border
          }}
        >
          
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {dashboardData.totalTeamEmployees}
          </p>
          <h5 style={{ fontSize: "18px"}}>Total Team Employees</h5>
        </div>

        {/* Active Shift Section */}
        <div
          style={{
            width: "20%",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            border: "2px solid #1D4ED8",
          }}
        >
          
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {dashboardData.activeShift}
          </p>
          <h5  style={{ fontSize: "18px" }}>Active Shift</h5>
        </div>

        {/* Present Employees Today Section */}
        <div
          style={{
            width: "20%",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            border: "2px solid #1D4ED8",
          }}
        >
        
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {dashboardData.presentEmployeesToday}
          </p>
          <h5 style={{ fontSize: "18px"}}>Present Employees Today</h5>
        </div>

        {/* Pending Leave Requests Section */}
        <div
          style={{
            width: "20%",
            padding: "20px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            border: "2px solid #1D4ED8",
          }}
        >

          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {dashboardData.pendingLeaveRequests}
          </p>
          <h5  style={{ fontSize: "18px" }}>Pending Leave Requests</h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
