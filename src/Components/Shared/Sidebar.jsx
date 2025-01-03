import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ role }) => {
  const [activeItem, setActiveItem] = useState(1); // Set default to Dashboard

  // Define menu sections for both roles
  const sections = {
    Employee: [
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
            label: "Request",
            icon: "fa fa-file-alt",
            path: "/leave-request",
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
    ],
    CEO: [
      {
        title: "MAIN MENU",
        items: [
          {
            id: 1,
            label: "Dashboard",
            icon: "fa fa-home",
            path: "/ceo/dashboard",
          },
          {
            id: 2,
            label: "Manage User",
            icon: "fa fa-user",
            path: "/ceo/manage-user",
          },
          {
            id: 3,
            label: "Manage Team",
            icon: "fa fa-users",
            path: "/ceo/manage-team",
          },
          {
            id: 4,
            label: "Leave Management",
            icon: "fa fa-file-alt",
            path: "/ceo/leave-management",
          },
          {
            id: 5,
            label: "Shift Schedule",
            icon: "fa fa-clock",
            path: "/ceo/shift-schedule",
          },
          {
            id: 6,
            label: "Reports",
            icon: "fa fa-chart-bar",
            path: "/ceo/reports",
          },
        ],
      },
    ],
    Manager: [
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
            label: "Request",
            icon: "fa fa-file-alt",
            path: "/leave-request",
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
    ],
  };

  // Get sections based on role
  const roleSections = sections[role] || [];

  return (
    <div className="sidebar">
      {roleSections.map((section, sectionIndex) => (
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
