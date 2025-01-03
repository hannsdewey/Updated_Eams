import React from "react";
import "./setting.css"; // Import the CSS for modal styling

const Settings = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px", // Increased the max width for a larger container
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "32px", // Increased padding for a spacious layout
        }}
      >
        {/* Page Heading */}
        <h1
          style={{
            marginBottom: "24px",
            textAlign: "center",
            color: "#333",
            fontSize: "24px", // Slightly larger font size
          }}
        >
          Settings
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                padding: "10px 20px", // Increased padding for better touch targets
              
                borderRadius: "4px",
               fontSize:"20px",
                fontWeight: "bold",
               
              }}
            >
              Account
            </h2>
          </div>

          {/* Content Section */}
          <div style={{ padding: "0 16px" }}>
            {/* Password Section */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "12px" }}>Password</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="password"
                  placeholder="Current password"
                  style={{
                    marginBottom: "12px",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
                <input
                  type="password"
                  placeholder="New password"
                  style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
              </div>
            </div>

            {/* Login Activity Section */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "12px" }}>Login Activity</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  color: "#666",
                  fontSize: "16px",
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
              <h3 style={{ color: "#444", fontSize: "18px", marginBottom: "12px" }}>Notification Preferences</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ flex: 1 }}>Clock-In</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </label>
                <label style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ flex: 1 }}>Upcoming Shifts</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </label>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ flex: 1 }}>Leave Approvals</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
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
