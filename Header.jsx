import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./header.css"; // Import the CSS for modal styling
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For toggling modal visibility

  const navigate = useNavigate(); // Initialize navigate

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Navigation handlers for modal buttons
  const goToProfile = () => {
    navigate("/profile"); // Navigate to the profile page
    toggleModal(); // Close the modal
  };

  const goToSettings = () => {
    navigate("/settings"); // Navigate to the settings page
    toggleModal(); // Close the modal
  };

  const logout = () => {
    // Implement logout logic here (e.g., clear user data, redirect to login)
    navigate("/login"); // Redirect to login page
    toggleModal(); // Close the modal
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

        {/* Settings Icon */}
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
              onClick={toggleModal} // Open modal when avatar is clicked
            />
          ) : (
            <i
              className="fa fa-user-circle"
              style={{
                fontSize: "20px",
                color: "#000",
                cursor: "pointer",
              }}
              onClick={toggleModal} // Open modal when icon is clicked
            ></i>
          )}
        </div>
      </div>

      {/* Modal for user information */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={goToProfile}>View Profile</button>
            <button onClick={goToSettings}>Settings</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
