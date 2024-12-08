import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Clock In"); // Dynamic status: Clock In or Clock Out

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Format time and date
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div
      style={{
        marginLeft: "0",
        marginTop: "3rem", // Sidebar width
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
              gap: "15px", // Adds spacing between clock and status
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
              style={{
                padding: "8px 16px",
                backgroundColor: status === "Clock In" ? "#4caf50" : "#f44336",
                color: "white",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              {status}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Main Content */}
      <div>
        <h3></h3>
        <p></p>
      </div>
    </div>
  );
};

export default DashboardM;
