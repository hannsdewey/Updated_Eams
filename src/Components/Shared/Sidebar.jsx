import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(1); // Set default to Dashboard

  const sections = [
    {
      title: "MAIN MENU",
      items: [
        {
          id: 1,
          label: "Dashboard",
          icon: "fa fa-home",
          path: "/dashboard",
        },
        {
          id: 2,
          label: "Attendance",
          icon: "fa fa-calendar-check",
          path: "/attendance",
        },
        {
          id: 3,
          label: "Shift Schedule",
          icon: "fa fa-clock",
          path: "/shift-schedule",
        },
        {
          id: 4,
          label: "Leave Request",
          icon: "fa fa-file-alt",
          path: "/leave-request",
        },
        {
          id: 5,
          label: "Inbox",
          icon: "fa fa-inbox",
          path: "/inbox",
        },
      ],
    },
    {
      title: "CHARTS & REPORTS",
      items: [
        {
          id: 6,
          label: "Reports",
          icon: "fa fa-chart-line",
          path: "/reports",
        },
      ],
    },
  ];

  return (
    <div className="sidebar">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="sidebar-section">
          {section.title && (
            <h5 className="sidebar-section-title">{section.title}</h5>
          )}
          <ul className="sidebar-menu">
            {section.items.map((item) => (
              <li
                key={item.id}
                className={`sidebar-item ${
                  activeItem === item.id ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <Link to={item.path} className="sidebar-link">
                  <i className={`${item.icon} sidebar-icon`}></i>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
