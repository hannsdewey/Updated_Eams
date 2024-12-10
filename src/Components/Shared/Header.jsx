import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Header = () => {
  // State to track notifications and user data
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchUserProfile();
  }, []);

  const fetchNotifications = async () => {
    const response = await fetch("/api/notifications");
    const data = await response.json();
    setNotifications(data.notifications);
  };

  const fetchUserProfile = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setUser(data);
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
      <h3
        style={{
          color: "blue",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        Raddacon Call Center
      </h3>

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
            style={{ fontSize: "20px", color: "#000" }}
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

        {/* Settings Icon (added) */}
        <div
          style={{
            marginRight: "20px",
            cursor: "pointer",
          }}
        >
          <i
            className="fa fa-cogs"
            style={{ fontSize: "20px", color: "#000" }}
          ></i>
        </div>

        {/* Profile Icon */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <img
              src={user.profilePicture}
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
                fontSize: "20px",
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
