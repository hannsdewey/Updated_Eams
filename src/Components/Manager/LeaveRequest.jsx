import React, { useState, useEffect } from "react";

const LeaveRequest = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("Submit Leave Request"); // Dynamic status

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

  // Toggle status
  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "Submit Leave Request" ? "Cancel Leave Request" : "Submit Leave Request"));
  };

  return (
    <div
      style={{
        marginLeft: "0",
        marginTop: "3rem", // Sidebar width
        padding: "20px",
        width: "100%",
      }}
    >
      {/* Leave Request Header */}
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
          {/* Left Section: Time and Date */}
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

          {/* Right Section: Leave Request Button */}
          <button
            onClick={toggleStatus}
            style={{
              padding: "8px 16px",
              backgroundColor: status === "Submit Leave Request" ? "#4caf50" : "#f44336",
              color: "white",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "center",
              minWidth: "160px",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        </div>
      </div>

      {/* LeaveRequest Main Content */}
      <div>
        <h3>Leave Request Section</h3>
        <p>Click the button above to submit or cancel your leave request.</p>
      </div>
    </div>
  );
};

export default LeaveRequest;
