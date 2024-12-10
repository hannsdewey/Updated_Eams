import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Header = () => {
  // State to track notifications and user data
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulating API call for notifications and user profile
    fetchNotifications();
    fetchUserProfile();
  }, []);

  // Fetch notifications from your backend API
  const fetchNotifications = async () => {
    // Replace with real API call to fetch notifications
    const response = await fetch("/api/notifications");
    const data = await response.json();
    setNotifications(data.notifications); // Assuming the response contains a notifications array
  };

  // Fetch user profile from your backend API
  const fetchUserProfile = async () => {
    // Replace with real API call to fetch user profile
    const response = await fetch("/api/user");
    const data = await response.json();
    setUser(data); // Assuming the response contains user data
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "10px 20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Left part: Title or other items */}
      <h3
        style={{
          color: "blue",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        Raddacon Call Center
      </h3>

      {/* Right part: Notification & Profile */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Notifications Icon */}
        <div
          style={{
            position: "relative",
            marginRight: "20px",
            cursor: "pointer",
          }}
        >
          <i
            className="fa fa-bell"
            style={{ fontSize: "24px", color: "#000" }}
          ></i>
          {notifications.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                textAlign: "center",
                lineHeight: "20px",
              }}
            >
              {notifications.length}
            </span>
          )}
        </div>

        {/* Profile Icon */}
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "5px" }}
        >
          {/* If user profile is available, show user's avatar */}
          {user ? (
            <img
              src={user.profilePicture} // Assuming `profilePicture` is the user's profile image URL
              alt="Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ) : (
            <i
              className="fa fa-user-circle"
              style={{
                fontSize: "24px",
                color: "#000",
                cursor: "pointer",
              }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
