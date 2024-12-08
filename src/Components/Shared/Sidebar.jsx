import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "./sidebar.css";

const Sidebar = () => {
  // Initialize activeItem with the ID of Dashboard (0)
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    {
      id: 0,
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      path: "/dashboard",
    },
    {
      id: 1,
      label: "Attendance",
      icon: "fas fa-calendar-check",
      path: "/attendance",
    },
    {
      id: 2,
      label: "Shift Schedule",
      icon: "fas fa-clock",
      path: "/shift-schedule",
    },
    {
      id: 3,
      label: "Leave Request",
      icon: "fas fa-plane",
      path: "/leave-request",
    },
    { id: 4, label: "Reports", icon: "fas fa-chart-line", path: "/reports" },
    { id: 5, label: "Inbox", icon: "fas fa-inbox", path: "/inbox" },
    { id: 6, label: "Settings", icon: "fas fa-cogs", path: "/settings" },
  ];

  return (
    <div
      className="bg-white text-black p-3"
      style={{
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        className="sidebar-title text-center"
        style={{ color: "blue", fontWeight: "bold" }}
      >
        Raddacon Call Center
      </h3>

      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => setActiveItem(item.id)}
          >
            <Link to={item.path} className="nav-link d-flex align-items-center">
              <i
                className={`${item.icon} ${
                  activeItem === item.id ? "text-primary" : "text-black"
                }`}
                style={{ marginRight: "10px" }}
              ></i>
              <span
                className={
                  activeItem === item.id ? "text-primary" : "text-black"
                }
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
