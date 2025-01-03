import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveRequest = () => {
  // State to store status counts
  const [statusCounts, setStatusCounts] = useState({
    requested: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  // Fetch the status counts when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leave-requests/status-counts")
      .then((response) => {
        setStatusCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching status counts", error);
      });
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h3 style={{ marginTop: "2rem" }}>Leave Request Management</h3>
      <p style={{ color: "#6B6666", fontSize: "14px" }}>
        View the number of leave requests based on their status.
      </p>

      {/* Status Counts Container */}
      <div
      
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.5rem",
         // Adjusted border thickness
          borderRadius: "8px", // Rounded corners
          width: "80%", // Adjusted width
          height: "90px", // Adjusted height
          margin: "0 auto", // Center align
          boxSizing: "border-box", // Ensure padding doesn't increase the size
        }}
      >
        
        {/* Requested */}
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "6px",
            backgroundColor: "#e8f5e9",
            flex: 1,
          }}
        >
          <h4 style={{ fontSize: "16px", marginBottom: "0.3rem" }}>Requested</h4>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {statusCounts.requested}
          </p>
        </div>

        {/* Approved */}
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "6px",
            backgroundColor: "#e3f2fd",
            flex: 1,
          }}
        >
          <h4 style={{ fontSize: "16px", marginBottom: "0.3rem" }}>Approved</h4>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {statusCounts.approved}
          </p>
        </div>

        {/* Rejected */}
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "6px",
            backgroundColor: "#ffebee",
            flex: 1,
          }}
        >
          <h4 style={{ fontSize: "16px", marginBottom: "0.3rem" }}>Rejected</h4>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {statusCounts.rejected}
          </p>
        </div>

        {/* Pending */}
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "6px",
            backgroundColor: "#fff3e0",
            flex: 1,
          }}
        >
          <h4 style={{ fontSize: "16px", marginBottom: "0.3rem" }}>Pending</h4>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {statusCounts.pending}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
