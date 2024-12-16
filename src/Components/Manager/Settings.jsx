import React from "react";

import "./setting.css"; // Import the CSS for modal styling
const Settings = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center", // Center the content horizontally
        alignItems: "center", // Center the content vertically
        minHeight: "100vh", // Take full viewport height
        backgroundColor: "#f4f4f4", // Background for whole page
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px", // Fixed width
          backgroundColor: "#ffffff", // Lighter background color
          borderRadius: "12px", // Slightly more rounded corners
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Enhanced shadow for modern look
          padding: "20px",
        }}
      >
        {/* Page Heading */}
        <h1
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center", // Center heading
            color: "#333",
            fontSize: "24px",
          }}
        >
          Settings
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center content in this section
            margin: "20px 0",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                border: "none",
                 // Active tab color
                backgroundColor: "transparent",
                fontWeight: "bold",
                cursor: "pointer",
                // Active tab color
              }}
            >
              Account
            </button>
           
          </div>

          {/* Content Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            {/* Password Section */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "10px" }}>Password</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="password"
                  placeholder="Current password"
                  style={{
                    marginBottom: "10px",
                    padding: "12px",
                    border: "none", // Removed border
                    borderRadius: "8px",
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#f9f9f9", // Light background
                  }}
                />
                <input
                  type="password"
                  placeholder="New password"
                  style={{
                    padding: "12px",
                    border: "none", // Removed border
                    borderRadius: "8px",
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#f9f9f9", // Light background
                  }}
                />
              </div>
            </div>

            {/* Login Activity Section */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "10px" }}>Login Activity</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                <li>Windows PC (Clock In)</li>
                <li>Windows PC (Clock Out)</li>
                <li>Windows PC (Leave Approval)</li>
              </ul>
            </div>

            {/* Notification Preferences */}
            <div>
  <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "10px" }}>Notification Preferences</h3>
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px" }}>Clock-In</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </label>
    <label style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px" }}>Upcoming Shifts</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </label>
    <label style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px" }}>Leave Approvals</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" ></span>
      </label>
    </label>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
